import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle, makeStyles, IconButton, Typography, CardContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { styledBy } from '../../../helpers/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: styledBy('ascent', theme.palette.ascents),
        padding: theme.spacing(2)
    },

}))

const ModalFormTitle = ({ ascent, children, className, onClose, ...props }) => {

    const classes = useStyle({ ascent });

    return (
        <CardContent disableTypography className={clsx(classes.root, className)} {...props}>
            <Typography variant="h6">{children}</Typography>
            {
                onClose && (
                    <IconButton aria-label="close" className={classes.closeButton} color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )
            }
        </CardContent>
    );
};

ModalFormTitle.propTypes = {

};

export default ModalFormTitle;