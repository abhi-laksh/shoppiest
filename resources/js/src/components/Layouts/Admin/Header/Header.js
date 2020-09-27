import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core';

import DrawerToggler from './DrawerToggler';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        minHeight: "48px"
    },
    rightNav: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexGrow: 1
    },
    menuButtons: {
        padding: theme.spacing(1),
    },

    form: {
        margin: 0,
        bottom: theme.spacing(1)
    },
    fontSize: {
        fontSize: "18px",
        margin: theme.spacing(0, 1),
    }

}))

const Header = ({ handleDrawerOpen, isDrawerOpen = false, ...props }) => {

    const classes = useStyles();

    return (
        <AppBar
            position="static"
            color="inherit"
            {...props}
        >
            <Toolbar className={classes.toolbar}>
                <DrawerToggler
                    handleDrawerOpen={handleDrawerOpen}
                    isDrawerOpen={isDrawerOpen}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;