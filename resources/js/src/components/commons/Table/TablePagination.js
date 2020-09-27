import React from 'react';
import PropTypes from 'prop-types';
import { TablePagination as MUITablePagination, makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import { styledBy } from '../../../helpers/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.ascents.systemWhite,
        '& .MuiTablePagination-toolbar': {
            minHeight: 50,
            height: 50,
            backgroundColor: styledBy('ascent', theme.palette.ascents),
        },
        '& .MuiTypography-body2': {
            ...theme.typography.body2,
        },



    },

    pagingSelectInput: {

        color: theme.palette.text.systemWhite,
        ...theme.typography.body2,
        '& > svg': {
            color: theme.palette.text.systemWhite,

        },
        '& > option': {
            color: theme.palette.text.primary,

            ...theme.typography.body1,
        }
    }


}))

const TablePagination = ({ className, ascent = "systemMetalDark", ...props }) => {
    const classes = useStyles({
        ascent
    })
    return (
        <MUITablePagination
            {...props}
            className={clsx(classes.root, classes[`${className}`])}
            SelectProps={{
                inputProps: {
                    "aria-label": "rows per page",
                    className: classes.pagingSelectInput,
                },
                native: true,
                className: classes.pagingSelectInput,
            }}
        />
    );
};

TablePagination.propTypes = {

};

export default TablePagination;