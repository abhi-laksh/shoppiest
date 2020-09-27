import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse, makeStyles, ListItemText } from '@material-ui/core';
import clsx from 'clsx';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Button from "../commons/Button/Button";
import { validAscents } from '../../constants/propTypesValidation';
import ListItem from './List/ListItem';
import { isCurrentTab } from '../../helpers/routes';
import { fadeAscentColor } from '../../helpers/styles';


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



const Collapsible = ({
    id = (new Date()
        .toJSON()
        .replace(/[\-TZ]/g, "-")
        .split("-")
        .slice(0, 3)
        .reverse()
        .join("-")),
    label = "Collapsible",
    borderwidth = 4,
    ascent = "primary",
    className,
    open,
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


    const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles({ ascent, borderwidth });

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const activeCollapse = (isActive) => () => {
        setIsOpen(isActive);
    }

    useEffect(() => {
        open && setIsOpen(Boolean(open));
    }, [open]);


    return (
        <>
            <ListItem
                id={`collapse-toggler-${id}`}
                button
                onClick={handleToggle ? handleToggle : handleClick}
                ascent={ascent}
                className={clsx(classes.toggler, {
                    [classes.collapse]: isForRoute,
                    [classes.toggler]: isOpen,
                }, className)}
            >
                {
                    (expandIconPostion === "start")
                        ? (!isOpen ? <ExpandMore /> : <ExpandLess />)
                        : null
                }

                {
                    isForRoute && (iconName)
                }
                <ListItemText primary={label} className={clsx(classes.listItem, listItemClassName)} />
                {
                    (expandIconPostion === "end" )
                        ? (!isOpen ? <ExpandMore /> : <ExpandLess />)
                        : null
                }
            </ListItem>
            <Collapse
                id={`collapse-${id}`}
                in={isOpen}
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

Collapsible.propTypes = {
    ascent: validAscents,
    open: PropTypes.bool,
    label: PropTypes.string,
    borderwidth: PropTypes.number,
    className: PropTypes.string,
    expandIconPostion: PropTypes.oneOf(["start", "end"]),
};

export default Collapsible;