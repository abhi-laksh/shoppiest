import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { validAscents } from '../../../../constants/propTypesValidation';
import { styledBy } from '../../../../helpers/styles';


const useStyle = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(2),

        color: styledBy('ascent', theme.palette.ascents),

        '& .MuiTouchRipple-child': {
            backgroundColor: styledBy('ascent', theme.palette.ascents)
        }
    },
}));

const DrawerToggler = ({ ascent = "primary", handleDrawerOpen, className, isDrawerOpen, ...props }) => {

    const classes = useStyle({ ascent });

    return (
        <IconButton
            color="primary"
            aria-label="open or close drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.root, className)}
        >
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
    );
};

DrawerToggler.propTypes = {
    ascent: validAscents,
    isDrawerOpen: PropTypes.bool,
    handleDrawerOpen: PropTypes.func,
};

export default DrawerToggler;