import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import {
  Table as MUITable,
  TableBody,
  TableContainer,
  TableSortLabel,
  FormControlLabel,
  Switch,
  Typography,
  withStyles,
  makeStyles,
  Box,
  Paper,
  TableFooter,
  TableCell,
  TableRow,
  Checkbox,
} from "@material-ui/core";

import { styledBy } from "../../../helpers/styles";

import TableHead from "./TableHead";
import TablePagination from "./TablePagination";
import TableData from "./TableData";
import TextBox from "../Input/TextBox";
import { validAscents } from "../../../constants/propTypesValidation";
import DragDropTableRow from "./DragDropTableRow";
import { Droppable } from "react-beautiful-dnd";
import clsx from "clsx";

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
  listStyle: {
    background: "lightblue",
    padding: 8,
  },
  dropRowCell: {
    padding: "30px",
    fontWeight: "bold",
  },
}));

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : null,
  padding: 1,
});

const DragDropTable = ({
  TopHeaderComponent,
  headCells = {},
  tableData = [],
  crud = { canRead: 1, canDelete: 0, canUpdate: 0 },
  emptyRowMessage = "No results found",
  hideActionCol = false,
  hideSelectIcon = false,
  headerBgAscent = "systemMetalLight",
  pages = { page: 0, handlePageChange: () => {} },
  rowsPerPage = { rowsPerPage: 5, handleRowsPerPage: () => {} },
  submitType = () => {},
  value,
  onSearchInput,
  ...props
}) => {
  const classes = useStyle({
    headerBgAscent,
  });

  //The number of rows per page - number of rows filled

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <MUITable className={classes.tableRoot}>
            <TableHead
              hideActions={hideActionCol}
              hideSelect={hideSelectIcon}
              cols={headCells}
            />

            <TableBody>
              {tableData &&
                tableData.map((row, rowIndex) => (
                  <Fragment>
                    <div
                      hover
                      role="checkbox"
                      style={{ margin: "10px 0" }}
                      tabIndex={-1}
                      key={rowIndex}
                    ></div>
                    {tableData &&
                    tableData.length === 1 &&
                    tableData[0].role.roleId === "-1" ? (
                      ""
                    ) : (
                      <Fragment>
                        <TableRow>
                          <TableCell
                            align="left"
                            key={row.Id}
                            component="th"
                            id={`enhanced-table-checkbox-${rowIndex}`}
                            scope="row"
                            padding="default"
                          >
                            {row.role.roleName}
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        {row.menuItems.map((singleMenu, menuIndex) => {
                          return (
                            <Fragment>
                              {/* todo add checkboxes + menu name code */}
                              <TableRow
                                align="left"
                                key={singleMenu.menuId}
                                id={menuIndex}
                                component="th"
                                scope="row"
                                padding="default"
                              >
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                ></TableCell>
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                >
                                  {singleMenu.menuName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                >
                                  <Checkbox
                                    checked={
                                      singleMenu["c"] &&
                                      singleMenu["r"] &&
                                      singleMenu["u"] &&
                                      singleMenu["d"]
                                    }
                                    onChange={(event) =>
                                      submitType(
                                        event,
                                        rowIndex,
                                        menuIndex,
                                        "All"
                                      )
                                    }
                                    color="primary"
                                  />
                                </TableCell>

                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                >
                                  <Checkbox
                                    checked={singleMenu["c"]}
                                    onChange={(event) =>
                                      submitType(
                                        event,
                                        rowIndex,
                                        menuIndex,
                                        "c"
                                      )
                                    }
                                    color="primary"
                                  />
                                </TableCell>
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                >
                                  <Checkbox
                                    checked={singleMenu["r"]}
                                    onChange={(event) =>
                                      submitType(
                                        event,
                                        rowIndex,
                                        menuIndex,
                                        "r"
                                      )
                                    }
                                    color="primary"
                                  />
                                </TableCell>
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                >
                                  <Checkbox
                                    checked={singleMenu["u"]}
                                    onChange={(event) =>
                                      submitType(
                                        event,
                                        rowIndex,
                                        menuIndex,
                                        "u"
                                      )
                                    }
                                    color="primary"
                                  />
                                </TableCell>
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                  padding="default"
                                >
                                  <Checkbox
                                    checked={singleMenu["d"]}
                                    onChange={(event) =>
                                      submitType(
                                        event,
                                        rowIndex,
                                        menuIndex,
                                        "d"
                                      )
                                    }
                                    color="primary"
                                  />
                                </TableCell>
                              </TableRow>
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    )}

                    <Droppable droppableId={"tableMenu-row-" + rowIndex}>
                      {(menuProvided, menuSnapshot) => (
                        <TableRow
                          {...menuProvided.droppableProps}
                          ref={menuProvided.innerRef}
                          style={getListStyle(menuSnapshot.isDraggingOver)}
                        >
                          <TableCell
                            style={{ padding: "30px", fontWeight: "bold" }}
                            align="center"
                            component="th"
                            scope="row"
                            padding="default"
                          >
                            {"Drop Menu"}
                          </TableCell>
                          {/* {menuProvided.placeholder} */}
                        </TableRow>
                      )}
                    </Droppable>
                  </Fragment>
                ))}

              {tableData.length < 1 ? (
                <Droppable droppableId={"table-role"}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={clsx({
                        [classes.listStyle]: snapshot.isDraggingOver,
                      })}
                    >
                      <div
                        hover
                        role="checkbox"
                        style={{ margin: "10px 0" }}
                        tabIndex={-1}
                      >
                        <TableCell
                          colSpan={7}
                          className={classes.dropRowCell}
                          align="center"
                        >
                          {"Drop Role"}
                        </TableCell>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ) : null}
            </TableBody>
          </MUITable>
        </TableContainer>
      </Paper>
    </Box>
  );
};

DragDropTable.propTypes = {
  headCells: PropTypes.objectOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
  headerBgAscent: validAscents,
  onSearchInput: PropTypes.func,
  hideActionCol: PropTypes.bool,
  hideSelectIcon: PropTypes.bool,
  crud: PropTypes.object,
  TopHeaderComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
  ]),
  pages: PropTypes.object,
  rowsPerPage: PropTypes.object,
};

export default DragDropTable;
