import React from 'react';
import { TableRow as MUITableRow, makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import { styledBy } from '../../../helpers/styles';
import clsx from 'clsx';


const useStyle = makeStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: styledBy('ascent', theme.palette.ascents)
        },

    },
    selected: {
        "& .Mui-selected:hover": {
            backgroundColor: styledBy('ascent', theme.palette.contrast)
        }
    }

}))


const TableRow = ({ className, ascent = "primary", ...props }) => {
    const classes = useStyle({
        ascent
    })
    return (
        <MUITableRow {...props} className={clsx(classes.root, classes.selected, className)} />
    );
};

TableRow.propTypes = {

};

export default TableRow;