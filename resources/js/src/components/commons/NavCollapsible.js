import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse, makeStyles, ListItemText } from '@material-ui/core';
import clsx from 'clsx';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Button from "./Button/Button";
import { validAscents } from '../../constants/propTypesValidation';
import { isCurrentTab } from '../../helpers/routes';
import { fadeAscentColor } from '../../helpers/styles';
import ListItem from './List/ListItem';


const useStyles = makeStyles((theme) => ({
    toggler: {
        borderLeft: ({ ascent, borderwidth }) => (`${borderwidth}px solid ${theme.palette.ascents[ascent]}`)
    },
    listItem: {
        fontSize: 12,
        marginLeft: 16,
        "& .MuiTypography-body1": {
            fontSize: "inherit"
        }
    },
    collapse: {
        // backgroundColor: fadeAscentColor(theme, 0.95)
        borderBottom: "1px solid #ccc",
    }
}));



const NavCollapsible = ({
    id = (new Date()
        .toJSON()
        .replace(/[\-TZ]/g, "-")
        .split("-")
        .slice(0, 3)
        .reverse()
        .join("-")),
    label = "NavCollapsible",
    borderwidth = 4,
    ascent = "primary",
    className,
    open,
    hide,
    handleToggle,
    children,
    expandIconPostion = "end",
    listItemClassName,
    isForRoute = false,
    path,
    history,
    iconName,
    ...props
}) => {


    const classes = useStyles({ ascent, borderwidth });




    return (
        <>
            <ListItem
                id={`collapse-toggler-${id}`}
                button
                onClick={handleToggle}
                ascent={ascent}
                className={clsx({
                    [classes.collapse]: isForRoute,
                    [classes.toggler]: open,
                }, className)}
            >
                {
                    (expandIconPostion === "start")
                        ? (!open ? <ExpandMore /> : <ExpandLess />)
                        : null
                }

                {
                    isForRoute && (iconName)
                }
                {!hide?<ListItemText primary={label} className={clsx(classes.listItem, listItemClassName)} />:null}
                {
                    (expandIconPostion === "end" && !hide)
                        ? (!open ? <ExpandMore /> : <ExpandLess />)
                        : null
                }
            </ListItem>
            <Collapse
                id={`collapse-${id}`}
                in={open}
                timeout={"auto"}
                // className={}
                // unmountOnExit
                {...props}
            >
                {children}
            </Collapse>
        </>
    );


};

NavCollapsible.propTypes = {
    ascent: validAscents,
    open: PropTypes.bool,
    label: PropTypes.string,
    borderwidth: PropTypes.number,
    className: PropTypes.string,
    expandIconPostion: PropTypes.oneOf(["start", "end"]),
};

export default NavCollapsible;