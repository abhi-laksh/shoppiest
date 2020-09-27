import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as MUILink, makeStyles, ListItemText } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

import ListItem from '../List/ListItem';
import { validAscents } from '../../../constants/propTypesValidation';
import { isCurrentTab } from '../../../helpers/routes';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        fontSize: "12px",
        width: "100%",
        display: "block",
        color: "inherit",
        '&:hover': {
            textDecoration: "none",
        },
        '& a': {
            fontSize: "12px",

        }
    },
}));


const MenuItem = ({ to, history, ascent, label = "Link", ...props }) => {

    const classes = useStyles();

    return (
        <ListItem ascent={ascent} color={isCurrentTab(history, to) ? ascent : null} button className={clsx({ active: isCurrentTab(history, to) })} {...props}>

            <ListItemText primary={
                <MUILink
                    component={Link}
                    to={to}
                    className={classes.link}
                >
                    {label}
                </MUILink>
            }
                disableTypography
            />
        </ListItem>
    );
};

MenuItem.propTypes = {
    label: PropTypes.string,
    ascent: validAscents,
};

export default withRouter(MenuItem);