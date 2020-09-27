import React from 'react';
import { Backdrop as MUIBackdrop, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { validAscents } from '../../constants/propTypesValidation';
import { styledBy } from '../../helpers/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: ({ opacity }) => `rgba(0,0,0,${opacity})`,
        zIndex: ({ zIndex }) => (zIndex || theme.zIndex.drawer),
        // TODO blur effect
        
        // '& *': {
        //     filter: ({ blur }) => (`blur(${blur}px)`),
        // }
    }
}));

const Backdrop = ({ ascent = "systemMetalDark", opacity = 0.8, blur = 0, zIndex, children, ...props }) => {

    const classes = useStyles({ ascent, opacity, zIndex, blur });

    return (
        <MUIBackdrop className={classes.root} {...props}>
            {children}
        </MUIBackdrop>
    );
};


Backdrop.propTypes = {
    ascent: validAscents,
    endAdornmentPosition: PropTypes.oneOf(["start", "end"]),
    endAdornment: PropTypes.node,
    inputProps: PropTypes.object,
    labelProps: PropTypes.object,
    zIndex: PropTypes.number,
    blur: PropTypes.number,
};



export default Backdrop;