import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CssBaseline as MUICssBaseline, makeStyles } from '@material-ui/core';
import { lightenColor } from '../../helpers/styles';



const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: "7px",
            height: "7px",
        },
        '*::-webkit-scrollbar-button': {
            width: "0",
            height: "0",
        },
        '*::-webkit-scrollbar-track': {
            background: lightenColor(theme.palette.ascents.primary, 0.45),
            border: "0px none #ffffff",
            borderRadius: "0",
            '&:hover,&:active': {
                background: lightenColor(theme.palette.ascents.primary, 0.45),
            }
        },
        '*::-webkit-scrollbar-track-piece': {

        },
        '*::-webkit-scrollbar-thumb': {
            background: lightenColor(theme.palette.ascents.primary, 0.15),
            border: "0px none #ffffff",
            borderRadius: "0",
            '&:hover,&:active': {
                background: lightenColor(theme.palette.ascents.primary, 0),
            }
        },
        '*::-webkit-scrollbar-corner': {
            background: "transparent",
        },
    },
}));


const CssBaseline = ({ ascent = "primary", className, children, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <MUICssBaseline ascent={ascent} classes={classes} />
    );
};

CssBaseline.propTypes = {

};

export default CssBaseline;