import React, { Fragment } from 'react';
import { Table, makeStyles, withStyles, Box, Paper, TableRow, TableCell, TableContainer, TableHead, TableBody, Checkbox } from '@material-ui/core';
import { dataTableStyles } from '../../../constants/styles';
import { headCells, list } from './helper';
import { Droppable, Draggable } from 'react-beautiful-dnd';



const tableStyles = makeStyles((theme) => (dataTableStyles(theme).table));
const pagingActionStyles = makeStyles((theme) => (dataTableStyles(theme).pagingAction));

const StyledTableRow = withStyles((theme) => (dataTableStyles(theme).tableRow))(TableRow);
const StyledTableCell = withStyles((theme) => (dataTableStyles(theme).tableCell))(TableCell);


const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : null,
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : null,
    padding: 8,

  });


const AccessTable = (props) => {
    const classes = tableStyles();
    const rows=props.list


    const rowHeight = 33; 


    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
               
                    <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            rows={headCells}
                        />
                        
                        <TableBody>
                                {rows && rows.map((row, rowIndex) => (
                                    <Fragment>
                                        <div
                                            hover
                                            role="checkbox"
                                            style={{margin:"10px 0"}}
                                            tabIndex={-1}
                                            key={rowIndex}
                                        ></div>
                                            {rows && rows.length===1 && rows[0].role.roleId==="-1"?
                                            ""
                                            :
                                            <Fragment>
                                                <StyledTableRow>
                                            <StyledTableCell align="left" key={row.Id} component="th" id={`enhanced-table-checkbox-${rowIndex}`} scope="row" padding="default">
                                                {row.role.roleName}
                                            </StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            </StyledTableRow>
                                            { row.menuItems.map((singleMenu, menuIndex) =>{
                                    return <Fragment>
                                        
                                        {/* todo add checkboxes + menu name code */}
                                        <StyledTableRow align="left" key={singleMenu.menuId} id={menuIndex} component="th" scope="row" padding="default">
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                       
                                        </StyledTableCell>
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                        {singleMenu.menuName}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                        <Checkbox
                                                checked={singleMenu["c"] && singleMenu["r"] && singleMenu["u"] && singleMenu["d"]}
                                                onChange={(event)=>props.submitType(event,rowIndex,menuIndex,"All")}
                                                color="primary"
                                            />
                                        </StyledTableCell>
                                        
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                        <Checkbox
                                                checked={singleMenu["c"]}
                                                onChange={(event)=>props.submitType(event,rowIndex,menuIndex,"c")}
                                                color="primary"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                        <Checkbox
                                                
                                                checked={singleMenu["r"]}
                                                onChange={(event)=>props.submitType(event,rowIndex,menuIndex,"r")}
                                                color="primary"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                        <Checkbox
                                                
                                                checked={singleMenu["u"]}
                                                onChange={(event)=>props.submitType(event,rowIndex,menuIndex,"u")}
                                                color="primary"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="left" component="th" scope="row" padding="default">
                                        <Checkbox
                                                
                                                checked={singleMenu["d"]}
                                                onChange={(event)=>props.submitType(event,rowIndex,menuIndex,"d")}
                                                color="primary"
                                            />
                                        </StyledTableCell>
                                        </StyledTableRow>

                                    </Fragment>
                                            })
                                         }
                                            </Fragment>
                                            }
                                        
                            <Droppable droppableId={"tableMenu-row-"+rowIndex}>
                            {(menuProvided, menuSnapshot) => (
                                <StyledTableRow
                                {...menuProvided.droppableProps}
                  ref={menuProvided.innerRef}
                  style={getListStyle(menuSnapshot.isDraggingOver)}>
                                         <StyledTableCell style={{padding:"30px",fontWeight:"bold"}} align="center" component="th" scope="row" padding="default">
                                        {"Drop Menu"}
                                        </StyledTableCell>
                                         {/* {menuProvided.placeholder} */}
                                </StyledTableRow>
                                )}
                                </Droppable>

                                </Fragment>

                                ))}

                            <Droppable droppableId={"table-role"}>
                                {(provided, snapshot) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                <div
                                    hover
                                    role="checkbox"
                                    style={{margin:"10px 0"}}
                                    tabIndex={-1}
                                >
                                    <StyledTableCell style={{padding:"30px",fontWeight:"bold"}} align="center" component="th" scope="row" padding="default">
                                                {"Drop Role"}
                                            </StyledTableCell>

                                    </div>
                                    {provided.placeholder}
                                </div>
                                )}                                    
                                </Droppable>
                                    
                            
                        </TableBody> 
                        
                        
                    </Table>
                    </TableContainer>

          
            </Paper>
        </Box>
                    
                   
    );
};
function EnhancedTableHead(props) {
    const {classes,rows } = props;


    return (
        <TableHead>
            <TableRow>
                {rows.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                            {headCell.label}

                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default AccessTable;