import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Typography, makeStyles } from '@material-ui/core';

import { withRouter } from 'react-router';
import NavCollapsible from '../../../commons/NavCollapsible';
import NavMenuItem from '../../../commons/Menu/NavMenuItem';

const useStyles = makeStyles((theme) => ({
    navHeader: {
        ...theme.typography.body2
    },
    margin: {
        marginTop: theme.spacing(6)
    }
}));

const createMenu = (menuList, currentCollapse, handleCollapse, props, hide, classes) => (menuList.map((each, i) => {

    if (!each.childrens) {
        return <NavMenuItem key={i} label={each.menuName} to={each.basePath} {...props} />
    }

    return (
        <NavCollapsible
            key={`collapse-${i}`}
            open={currentCollapse === `collapse-${i}`}
            hide={hide}
            ascent={"primary"}
            isForRoute={true}
            path={each.basePath}
            label={each.menuName}
            className={classes.navHeader}
            handleToggle={handleCollapse(`collapse-${i}`)}
            {...props}
        >
            {createMenu(each.childrens)}
        </NavCollapsible>
    )
}));

const NavMenu = ({ menuList = [], hide = false, ...props }) => {

    const classes = useStyles()

    const [currentCollapse, setCurrentCollaps] = useState(null);

    const handleCollapse = (currentCollapseParam) => () => {
        // param === state
        if (currentCollapseParam === currentCollapse) {
            setCurrentCollaps(null);
        } else {
            setCurrentCollaps(currentCollapseParam);
        }
    }

    return (
        <List component="li" disablePadding {...props}>
            {(createMenu(menuList, currentCollapse, handleCollapse, props, hide, classes))}
        </List>
    );
};

NavMenu.propTypes = {
    menuList: PropTypes.array,
};

export default withRouter(NavMenu);