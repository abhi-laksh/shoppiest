import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const DropdownItem = ({ className, children, ascent, onClick, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <MenuItem onClick={onClick} className={clsx(classes.root, className)} >{children}</MenuItem>
    );
};

DropdownItem.propTypes = {

};

export default DropdownItem;