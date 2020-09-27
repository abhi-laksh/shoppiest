import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, makeStyles, Grid, Button } from "@material-ui/core";
import clsx from 'clsx';
import Header from './Header/Header';
import Drawer from '../../commons/Drawer/Drawer';
import { createCSSValue, fadeAscentColor } from '../../../helpers/styles';
import NavMenu from './Nav/NavMenu';
import menuList from "../../../constants/TEMPMenu.json";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        '& .MuiDrawer-paperAnchorDockedLeft': {
            backgroundColor: fadeAscentColor(theme, 0),
            boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.25)",
            border: "none !important",
            padding: theme.spacing(1, 0)
        }
    },

    appBar: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 3,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
            // width: createCSSValue("closeDrawerWidth", "calc(100% - |closeDrawerWidth|px)"),
            // marginLeft: createCSSValue("closeDrawerWidth"),
        },
    },

    appBarShift: {
        width: createCSSValue("openDrawerWidth", "calc(100% - |openDrawerWidth|px)"),
        marginLeft: createCSSValue("openDrawerWidth"),
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    drawer: {
        width: createCSSValue("openDrawerWidth"),
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerPaper: {

        padding: theme.spacing(2),
        width: createCSSValue("openDrawerWidth"),
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    drawerOpen: {
        width: createCSSValue("openDrawerWidth"),
        padding: theme.spacing(2),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
        [theme.breakpoints.up('md')]: {
            // width: createCSSValue("closeDrawerWidth"),
        },
    },

    content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginTop: theme.spacing(6),
        marginLeft: 0,

        [theme.breakpoints.up('md')]: {
            // marginLeft: createCSSValue("closeDrawerWidth"),
        },
    },

    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: createCSSValue("openDrawerWidth"),
    },

    headerFlex: {
        display: "flex",
        alignItems: "center",
    },
    contentHeader: {
        justifyContent: "space-between",
        padding: theme.spacing(2.5, 1.5),
    },
    sidebarToRight: {
        order: 1,
    },
    hide: {
        display: "none"
    },
    right: {
        // backgroundColor: "#e2e2aa"
    },
	/* 
		Ref: https://material-ui.com/components/grid/#negative-margin 
		!Do not use spacing in <Grid> it uses negative margin.
	*/
    gutter: {
        padding: theme.spacing(1.5),
    },
    secondarySideBarChild: {
        marginTop: 10,
    },
}));


const Base = ({ ascent, className, children, openDrawerWidth = 280, closeDrawerWidth = 64, ...props }) => {

    const [open, setOpen] = useState(true);

    const classes = useStyles({ ascent, openDrawerWidth, closeDrawerWidth });

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Header
                handleDrawerOpen={toggleDrawer}
                isDrawerOpen={open}
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            />
            <Box className={classes.root}>
                <Drawer
                    className={clsx(classes.drawer,
                        {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }
                    )}

                    variant="permanent"
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <NavMenu
                        menuList={menuList.menus}
                    />
                </Drawer>
            </Box>

            <section
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <Container maxWidth="xl">
                    {children}
                </Container>
            </section>
        </>
    );
};

Base.propTypes = {

};

export default Base;