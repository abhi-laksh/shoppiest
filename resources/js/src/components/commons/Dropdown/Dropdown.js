import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Button from '../Button/Button';


const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

const Dropdown = ({
    id = (`dropdown-${(Date.now())}`),
    label = "Dropdown",
    ascent,
    children,
    className,
    togglerProps,
    anchorOrigin = {
        vertical: 'top',
        horizontal: 'center',
    },
    transformOrigin = {
        vertical: 'top',
        horizontal: 'center',
    },
    onClose = () => { },
    ...props
}) => {

    const classes = useStyles({ ascent });
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        onClose();
        setAnchorEl(null);
    }

    return (
        <>
            <Button
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleClick}
                {...togglerProps}
            >
                {label}
            </Button>
            <Menu
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={clsx(classes.root, className)}
                // positons the menu item
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                {...props}
            >
                {children}
            </Menu>
        </>

    );
};

Dropdown.propTypes = {
    togglerProps: PropTypes.object,
};

export default Dropdown;