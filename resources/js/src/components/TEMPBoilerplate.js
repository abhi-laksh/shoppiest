import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';



const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const TEMPBoilerplate = ({ ascent, className, children, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <div className={clsx(classes.root, className)}>
            {children}
        </div>
    );
};

TEMPBoilerplate.propTypes = {

};

export default TEMPBoilerplate;