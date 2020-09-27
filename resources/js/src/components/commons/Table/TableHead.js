import React from 'react';
import PropTypes from 'prop-types';

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
    TableHead as MUITableHead
} from "@material-ui/core";
import TableCell from './TableCell';
import clsx from 'clsx';
import TableRow from './TableRow';

const useStyle = makeStyles((theme) => ({
    tableCell: {
        paddingLeft: 10,
        textAlign:"center",
        textTransform:"uppercase",
    }
}))

const TableHead = ({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    cols = {},
    hideActions = false,
    hideSelect = false,
    ...props
}) => {

    const classes = useStyle();

    const Cell = (each) => {

        var col = cols[each];

        return (
            <TableCell
                key={col.id}
                sortDirection={orderBy === col.id ? order : false}
                className={clsx(`head`, classes.tableCell)}
                color="systemWhite"
            >
                {col.label}
            </TableCell>
        )
    }

    return (
        <MUITableHead>
            <TableRow {...props}>
                {(!hideSelect) && <TableCell>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                        color="primary"
                        size="small"
                    />
                </TableCell>}
                {Object.keys(cols).map(Cell)}
                {
                    (!hideActions) && (
                        <TableCell color="systemWhite">
                            Actions
                        </TableCell>
                    )
                }
            </TableRow>
        </MUITableHead>
    );
};

TableHead.propTypes = {
    cols: PropTypes.objectOf(PropTypes.object),
};

export default TableHead;