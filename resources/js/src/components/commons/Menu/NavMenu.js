import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Typography, makeStyles } from '@material-ui/core';

// import dummyMenuList from "../../../assets/json/dummyMenu.json"

import NavCollapsible from '../NavCollapsible';
import NavMenuItem from './NavMenuItem';
import NavSearch from './NavSearch';
import { withRouter } from 'react-router';
import { isCurrentTab } from '../../../helpers/routes';

import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssistantIcon from '@material-ui/icons/Assistant';
import AppsIcon from '@material-ui/icons/Apps';
import { useDispatch, useSelector } from 'react-redux';
import { getNavMenuList } from '../../../redux/actions/menuAction';
import { getMenuList } from '../../../service/menuService';
import dummyMenu from "../../../assets/json/dummyMenu";





const useStyles = makeStyles((theme) => ({
    navHeader: {
        ...theme.typography.body2
    },
    margin: {
        marginTop: theme.spacing(6)
    }
}));

const Icons = {
    "PeopleIcon": (<PeopleIcon fontSize={"small"} />),
    "AssessmentIcon": (<AssessmentIcon fontSize={"small"} />),
    "AccountBalanceWalletIcon": (<AccountBalanceWalletIcon fontSize={"small"} />),
    "AssistantIcon": (<AssistantIcon fontSize={"small"} />),
    "AppsIcon": (<AppsIcon fontSize={"small"} />),
}

const createMenu = (menuList, currentCollapse, handleCollapse, props, hide,classes) => (menuList.map((each, i) => {

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
            iconName={Icons[each.iconName]}
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
    const dispatch=useDispatch()
    const navMenuList=useSelector(state=>state.navMenuList.navMenuList)

        //Fetch dynamic sidebar
    //TODO: screen routes Based on dynamic sidebar


    const [currentCollapse, setCurrentCollaps] = useState(null);

    // const [searchText, setSearchText] = useState("");

    const [searchText, searchInput] = NavSearch();

    // const handleSearch = (e) => {
    //     setSearchText(e.target.value)
    // }

    const searchMenu = (searchText) => (each) => {

        return (each.menuName && (each.menuName.toLowerCase().indexOf(searchText.toLowerCase())) !== -1)
    }

    const filteredMenu = (searchText && (navMenuList.filter(searchMenu(searchText))));

    const handleCollapse = (currentCollapseParam) => () => {
        // param === state
        if (currentCollapseParam === currentCollapse) {
            setCurrentCollaps(null);
        } else {
            setCurrentCollaps(currentCollapseParam);
        }
    }

    return (
        <>
            {hide ? searchInput : <Typography className={classes.margin} />}
            <List component="li" disablePadding {...props}>
                {
                    (searchText && searchText.length > 0)
                        ? (
                            (filteredMenu && filteredMenu.length > 0)
                                ? (createMenu(filteredMenu, currentCollapse, handleCollapse, props))
                                : (<Typography>No such menu found</Typography>)
                        )
                        : (
                            (createMenu(menuList, currentCollapse, handleCollapse, props, hide,classes))
                        )
                }
            </List>
        </>
    );
};

NavMenu.propTypes = {
    menuList: PropTypes.array,
};

export default withRouter(NavMenu);