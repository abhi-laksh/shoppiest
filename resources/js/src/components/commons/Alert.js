import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
    root: {
        alignItems: "center",
    }
}))

const Alert = ({ className, ...props }) => {
    const classes = useStyle();
    return (
        <MuiAlert className={clsx(classes.root, className)} {...props} />
    );
};

export default Alert;