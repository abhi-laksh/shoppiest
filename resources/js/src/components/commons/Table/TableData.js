import React from "react";
import PropTypes from "prop-types";
import {
	TableCell as MUITableCell,
	makeStyles,
	Checkbox,
	IconButton,
	Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { styledBy } from "../../../helpers/styles";
import { validAscents } from "../../../constants/propTypesValidation";
import TableCell from "./TableCell";

import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import TableRow from "./TableRow";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { formatDate } from "../../../helpers/other";

const useStyle = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(0, 1, 0, 1.5),
		height: 33,
		fontWeight: 600,
		...theme.typography.body2,
	},
	head: {
		color: theme.palette.ascents.systemWhite,
		padding: theme.spacing(0, 1, 0, 1.5),
		height: 33,
		fontWeight: 600,
		...theme.typography.body2,
		"&:hover": {
			color: theme.palette.ascents.systemWhite,
		},
	},
	buttons: {
		padding: theme.spacing(0.5),
		"& .MuiSvgIcon-root": {
			fontSize: "14px",
		},
	},
	action: {
		width: "7rem",
	},
}));







const TableData = ({
	className,
	ascent = "systemWhite",
	onClickCheckbox,
	hideSelect,
	handleCheck = () => { },
	isSelected = () => { },
	hideActionCol,
	page,
	rowsPerPage,
	crud,
	tableData = [],
	headCells = {},
	idKeyInHeadCell,
	ActiveComponent = () => null,
	InActiveComponent = () => null,
	onReadData = () => { },
	onDeleteData = () => { },
	...props
}) => {
	const classes = useStyle({
		ascent,
	});

	const crudActions = {
		onRead: (eachData) => () => {
			onReadData(eachData, true);
		},
		onDelete: (eachData) => () => {
			onDeleteData(eachData);
		},
		onUpdate: (eachData) => () => {
			onReadData(eachData, false);
		},
	};

	const viewIcon = (eachData) => (
		<IconButton
			onClick={crudActions && crudActions.onRead(eachData)}
			disabled={crud && crud.canRead < 1}
			className={classes.buttons}
		>
			<VisibilityIcon fontSize={"small"} />
		</IconButton>)

	const editIcon = (eachData) => (

		<IconButton
			onClick={crudActions && crudActions.onUpdate(eachData)}
			disabled={!crud.canUpdate}
			className={classes.buttons}
		>
			<BorderColorIcon fontSize={"small"} />
		</IconButton>

	)
	const deleteIcon = (eachData) => (
		<IconButton
			onClick={crudActions && crudActions.onDelete(eachData)}
			disabled={!crud.canDelete}
			className={classes.buttons}
		>
			<DeleteIcon fontSize={"small"} />
		</IconButton>


	)



	// eachHeadcell's Obj.id is JSON key of data
	const Cell = (eachData) => (each, i) => {
		var headCell = headCells[each];

		/* 
				eachData[orgCode] === null {
					headCell.InActiveComponent()
				}
			*/

		var dataValue;

		if (headCell.labelJsonKey) {
			dataValue = eachData[headCell.labelJsonKey];
		} else {
			dataValue = eachData[headCell.id];
		}

		return (
			<TableCell key={(headCell && headCell.id) || i}>
				{headCell.showComponent ? (
					dataValue ? (
						<ActiveComponent
							eachData={eachData}
							jsonKey={headCell.id}
						>
							{dataValue}
						</ActiveComponent>
					) : (
							<InActiveComponent
								eachData={eachData[headCell.id]}
								jsonKey={headCell.id}
							/>
						)
				) : headCell.type === "bool" ? (
					dataValue === 1 ? (
						headCell.correctIcon({
							children: <CheckCircleOutlineIcon className={classes.buttons} />,
						})
					) : null
				) : headCell.type === "date" ? (
					formatDate(dataValue)
				) : (
								dataValue
							)}
			</TableCell>
		);
	};

	const Row = (eachData, index) => (
		<TableRow ascent="systemWhite">
			{!hideSelect ? (
				<TableCell>
					<Checkbox
						onChange={(event) => handleCheck(event, eachData, index)}
						checked={isSelected(eachData, index)}
						// inputProps={{ "aria-labelledby": labelId }}
						color="primary"
						size="small"
					/>
				</TableCell>
			) : null}
			{Object.keys(headCells).map(Cell(eachData))}
			{!hideActionCol ? (
				<TableCell color={"systemWhite"} className={classes.action}>
					{viewIcon(eachData)}
					{editIcon(eachData)}
					{deleteIcon(eachData)}
				</TableCell>
			) : null}
		</TableRow>
	);

	return tableData
		.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		.map(Row);
};

TableData.propTypes = {
	ascent: validAscents,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
};

export default TableData;
