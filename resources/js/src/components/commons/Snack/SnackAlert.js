import React from 'react';
import PropTypes from 'prop-types';
import SnackIt from './SnackIt';
import Alert from '../Alert';


const SnackAlert = ({ children, ...props }) => {
    return (
        <SnackIt {...props}>
            <Alert {...props}>
                {children}
            </Alert>
        </SnackIt>
    );
};

SnackAlert.propTypes = {

};

export default SnackAlert;