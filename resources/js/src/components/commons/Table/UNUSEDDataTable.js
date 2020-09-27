import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import {
	Table,
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
	TableHead
} from "@material-ui/core";


import ArrowDownward from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import { userTableCells } from "../../../constants/userConstants";

import {
	globalStyles,
	SYSTEM_COLOR_WHITE,
	FONT_SIZE_BODY2,
	SYSTEM_COLOR_METAL2,
	BRAND_AND_ASCENT_COLOR_02_VIOLET,
	FONT_SIZE_BODY1,
	FONT_WEIGHT_BOLD,
} from "../../../constants/styleConstants";

import TableCell from "./TableCell";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";
import Button from "../Button/Button";

const tableStyles = makeStyles((theme) => ({
	...globalStyles(theme),
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
		background: SYSTEM_COLOR_METAL2,
		height: 60,
	},
	table: {
		minWidth: "100%",
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
	paginationTop: {
		color: SYSTEM_COLOR_WHITE,
		marginTop: 25,
		width: "100%",
		"& .MuiTablePagination-toolbar": {
			minHeight: 33,
			height: 33,
		},
		"& .MuiTypography-body2": {
			fontSize: FONT_SIZE_BODY2,
		},
	},

	tableSearchField: {
		width: "100%",
	},
	tableSearchFieldInput: {
		...globalStyles(theme).body2,
		color: SYSTEM_COLOR_WHITE,
		"&.MuiInput-underline:before": {
			borderBottom: "1px solid #ffffffbf",
		},
		"&.MuiInput-underline:after": {
			borderBottom: "1px solid" + SYSTEM_COLOR_WHITE,
		},
		"&.MuiInput-underline:hover:not(.Mui-disabled):before": {
			borderBottom: "1px solid " + SYSTEM_COLOR_WHITE,
		},
	},
	tableSearchFieldInputLabel: {
		...globalStyles(theme).body2,
		color: SYSTEM_COLOR_WHITE,
		"&.MuiFormLabel-root.Mui-focused": {
			color: SYSTEM_COLOR_WHITE,
		},
	},
	tableSearchFieldIcon: {
		...globalStyles(theme).icon,
		color: SYSTEM_COLOR_WHITE,
		padding: 6,
		"& > span > svg": {
			fontSize: 20,
		},
	},
	tableSortField: {
		width: "100%",
	},
	tableSortFieldOthers: {
		...globalStyles(theme).body2,
		color: SYSTEM_COLOR_WHITE,
		"& > svg": {
			color: SYSTEM_COLOR_WHITE,
		},
		"&.MuiFormLabel-root.Mui-focused": {
			color: SYSTEM_COLOR_WHITE,
		},
		"&.MuiInput-underline:before": {
			borderBottom: "1px solid #ffffffbf",
		},
		"&.MuiInput-underline:after": {
			borderBottom: "1px solid " + SYSTEM_COLOR_WHITE,
		},
		"&.MuiInput-underline:hover:not(.Mui-disabled):before": {
			borderBottom: "1px solid " + SYSTEM_COLOR_WHITE,
		},
		"& select > option": {
			...globalStyles(theme).selectOption,
			fontSize: FONT_SIZE_BODY2,
			backgroundColor: "#edf5ff",
		},
	},
}));



const useStyles=makeStyles((theme) => ({
  
  actionButton:{
    ...theme.typography.body2,
    maxWidth:0
  }

}));


const RowCell = (data, crudControl,props) => (eachTableCell, index) => {
  console.log(`${eachTableCell.id}-${index}`);
  let cellValue = data[eachTableCell.id];
  let button;


  // TODO paste logic here for orgCode and roleCode
  if (eachTableCell.id === "orgCode") {
    if (cellValue) {
      cellValue = data.orgName;
    } else {
      cellValue = "Associate";
    }
    button = (
      <Button variant="outlined" ascent={"systemMetalDark"} className={"userOrgRole"}>
        {cellValue}
      </Button>
    );
    cellValue = button;
  } else if (eachTableCell.id === "roleCode") {
    if (cellValue) {
      cellValue = data.roleName;
    } else {
      cellValue = "Associate";
    }
    button = (
      <Button variant="outlined" ascent={"systemMetalDark"} className={"userOrgRole"}>
        {cellValue}
      </Button>
    );
    cellValue = button;
  } else if (eachTableCell.id === "actionOfTable") {
    console.log(crudControl)
    const crudIcons = (
      <>
    {!props.accessRight? (
                                <Button 

                                
                                // onClick={() => props.editHandler(row, row.id,true)}                            

								variant="outlined"
								
								ascent="systemMetalDark"

                                disabled={!crudControl.canRead}>
                                  <i
                            
                                  className="fas fa-eye"
                                ></i>
                                  
                                  </Button>
                              ) : null}
                          { !props.accessRight? (
                                <Button 
                                
                                // onClick={() => props.editHandler(row, row.id)}                            
                                
								variant="outlined"
								
								ascent="systemMetalDark"
								
								
								disabled={!crudControl.canUpdate}>
                                  <i
                            
                                  className="fas fa-edit"
                                ></i>
                                  
                                  </Button>
                              ) : null}
                              {true? (
                                <Button 
                                
                                // onClick={() => props.deleteHandler(row, row.id)}                            
                                
                                variant="outlined"

								ascent="systemMetalDark"
								
                                disabled={!crudControl.canDelete}>
                                <i
                                  className="fas fa-trash"
                                ></i>

                                </Button>

                              ) : null}
      </>
    )
    cellValue = crudIcons
  }

	return (
		<>
			<TableCell
				key={`${eachTableCell.id}-${index}`}
				component="th"
				id={eachTableCell.id}
				scope="row"
				ascent={"systemWash"}
			>
				{cellValue}
			</TableCell>
		</>
	);
};

const Row = (eachId, index, users, crudControl,props) => {
  // user:Object
  const user = users.byUserID[eachId];


	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			key={eachId}
			ascent={"secondary"}
		>
			<TableCell ascent={"systemWash"}>
				<Checkbox
					//   checked={isItemSelected}
					//   inputProps={{ "aria-labelledby": labelId }}
					color="primary"
					size="small"
				/>
			</TableCell>
			{userTableCells.map(RowCell(user, crud))}

		</TableRow>
	);
};

const DataTable = ({ tableRows, users, crud }) => {

	const classes = tableStyles();

	const [page, setPage] = useState(0);

	const [rowsPerPage, setRowsPerPage] = useState(5);

	// const allUsers = useSelector(state=>state.users.allUserIds);

	const allUsers = users.allUserIds;


	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, allUsers.length - page * rowsPerPage);

	const rowHeight = 33;

	return (
		<Box className={classes.root}>
			<Paper className={classes.paper}>
				<Box className={classes.topHeader}>
					<Box
						className={classes.body1}
						style={{ width: "100%", padding: 10, display: "flex" }}
					></Box>
				</Box>

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              // numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              // rowCount={rows.length}
              rows={tableRows}
            // translate={t}
            />
            <TableBody>
              {allUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event, index) => Row(event, index, users, crudControl,props))}
              {emptyRows > 0 && (
                <TableRow
                  ascent="systemWhite"
                  style={{ height: rowHeight * emptyRows }}
                >
                  <TableCell colSpan={allUsers.length + 1} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={12}
                  count={allUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

DataTable.propTypes = {};

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		rows,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell className={`head`}>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}
						color="primary"
						size="small"
					/>
				</TableCell>
				{rows.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={"left"}
						style={{ padding: "0px" }}
						sortDirection={orderBy === headCell.id ? order : false}
						className={`head`}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default DataTable;
