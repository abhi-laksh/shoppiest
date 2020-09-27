import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { styledBy } from '../../../helpers/styles';
import { validAscents } from '../../../constants/propTypesValidation';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: styledBy('ascent', theme.palette.ascents),
        display: "block",
        width: "100%",

        '& .MuiLinearProgress-bar': {
            backgroundColor: styledBy('ascent', theme.palette.contrast),
        }
    }
}));

const LineLoader = ({ ascent = "systemSkyDark", className, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <LinearProgress className={clsx(classes.root, className)} {...props} />
    );
};

LineLoader.propTypes = {
    ascent: validAscents
};

export default LineLoader;