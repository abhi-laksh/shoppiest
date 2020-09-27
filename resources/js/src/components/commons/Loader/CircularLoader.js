import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { styledBy } from '../../../helpers/styles';
import { validAscents } from '../../../constants/propTypesValidation';

const useStyles = makeStyles((theme) => ({
    root: {
        color: styledBy('ascent', theme.palette.ascents),
    }
}));

const CircularLoader = ({ ascent = "primary", className, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <CircularProgress className={clsx(classes.root, className)} {...props} />
    );
};

CircularLoader.propTypes = {
    ascent: validAscents
};

export default CircularLoader;