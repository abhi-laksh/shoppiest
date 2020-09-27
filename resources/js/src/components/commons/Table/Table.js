import React, { useState } from "react";
import PropTypes from "prop-types";

import {
	Table as MUITable,
	TableBody,
	TableContainer,
	Checkbox,
	TableSortLabel,
	FormControlLabel,
	Switch,
	Typography,
	withStyles,
	makeStyles,
	Box,
	Paper,
	TableFooter,
} from "@material-ui/core";

import { styledBy } from "../../../helpers/styles";

import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";
import TableCell from "./TableCell";
import TableData from "./TableData";
import TextBox from "../Input/TextBox";
import { validAscents } from "../../../constants/propTypesValidation";

const useStyle = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	topHeader: {
		width: "100%",
		display: "flex",
		background: styledBy("headerBgAscent", theme.palette.ascents),
		padding: theme.spacing(3),
		alignItems: "center",
	},
	searchBox: {
		color: theme.palette.ascents.systemWash,
	},
}));

const Table = ({
	TopHeaderComponent,
	ActiveComponent,
	InActiveComponent,
	headCells = {},
	tableData = [],
	crud = { canRead: 0, canDelete: 0, canUpdate: 0 },
	emptyRowMessage = "No results found",
	hideSelect = false,
	hideActionCol = false,
	headerBgAscent = "systemMetalLight",
	pages = { page: 0, handlePageChange: () => { } },
	rowsPerPage = { rowsPerPage: 5, handleRowsPerPage: () => { } },
	handleCheck,
	isSelected,
	onReadData,
	onDeleteData,
	value,
	onSearchInput,
	hideSearchBox = false,
	theadAscent,
	...props
}) => {
	const classes = useStyle({
		headerBgAscent,
	});

	const EmptyRow = (
		<TableRow ascent="systemWhite" colSpan={Object.keys(headCells).length + 2}>
			<TableCell colSpan={Object.keys(headCells).length + 2}>
				{emptyRowMessage}
			</TableCell>
		</TableRow>
	);

	//The number of rows per page - number of rows filled
	const emptyRows =
		rowsPerPage.rowsPerPage -
		Math.min(
			rowsPerPage.rowsPerPage,
			tableData.length - pages.page * rowsPerPage.rowsPerPage
		);

	return (
		<Box className={classes.root}>
			<Paper className={classes.paper}>
				{
					hideSearchBox && (
						<Box className={classes.topHeader}>
							{TopHeaderComponent ? (
								TopHeaderComponent
							) : (
									<TextBox
										labelClassName={classes.searchBox}
										inputClassName={classes.searchBox}
										value={value}
										onChange={onSearchInput}
										label={"Search Here"}
									/>
								)}
						</Box>
					)
				}
				<TableContainer>
					<MUITable className={classes.tableRoot}>
						<TableHead
							hideSelect={hideSelect}
							hideActions={hideActionCol}
							cols={headCells}
							ascent={theadAscent}
						/>

						<TableBody>
							<TableData
								ActiveComponent={ActiveComponent}
								InActiveComponent={InActiveComponent}
								onReadData={onReadData}
								handleCheck={handleCheck}
								isSelected={isSelected}
								onDeleteData={onDeleteData}
								crud={crud}
								hideSelect={hideSelect}
								hideActionCol={hideActionCol}
								page={pages.page}
								rowsPerPage={rowsPerPage.rowsPerPage}
								headCells={headCells}
								tableData={tableData}
							/>
							<TableRow style={{ height: emptyRows * 40 }}></TableRow>
						</TableBody>

						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25, 100]}
									colSpan={Object.keys(headCells).length + 2}
									count={tableData.length}
									rowsPerPage={rowsPerPage.rowsPerPage}
									page={pages.page}
									onChangePage={pages.handlePageChange}
									onChangeRowsPerPage={rowsPerPage.handleRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</MUITable>
				</TableContainer>
			</Paper>
		</Box>
	);
};

Table.propTypes = {
	headCells: PropTypes.objectOf(PropTypes.object),
	tableData: PropTypes.arrayOf(PropTypes.object),
	headerBgAscent: validAscents,
	onSearchInput: PropTypes.func,
	hideSelect: PropTypes.bool,
	hideActionCol: PropTypes.bool,
	crud: PropTypes.object,
	TopHeaderComponent: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
	]),
	pages: PropTypes.object,
	rowsPerPage: PropTypes.object,
};

export default Table;
