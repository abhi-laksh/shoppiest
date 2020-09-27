import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Button from '../Button/Button';

const SnackIt = ({ closeSnack, autoHideDuration =300000, open = false, buttonLabel = "Open", buttonProps, children, ...props }) => {

    return (
        <>
            <Snackbar
                open={open}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                action={
                    <IconButton
                        onClick={closeSnack}
                    >
                        <CloseIcon />
                    </IconButton>
                }
                onClose={closeSnack}
                autoHideDuration={autoHideDuration}
                {...props}
            >
                {children}
            </Snackbar>
        </>
    );
};

SnackIt.propTypes = {
    buttonLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    buttonProps: PropTypes.object,
    closeSnack: PropTypes.func
};

export default SnackIt;