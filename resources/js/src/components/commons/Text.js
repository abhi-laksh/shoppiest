import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';

import { styledBy } from '../../helpers/styles';
import { validAscents } from '../../constants/propTypesValidation';


const useStyle = makeStyles((theme) => ({
    root: {
        color: styledBy('ascent', theme.palette.ascents)
    }
}))

const Text = ({ ascent, children, className, ...props }) => {

    const classes = useStyle({ ascent });

    return (
        <Typography className={clsx(classes.root, className)} {...props}>
            {children}
        </Typography>
    );
};

Text.propTypes = {
    ascent: validAscents
};

export default Text;