import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { FormDataContext } from './FormDataProvider';
import Button from '../Button/Button';
import FormBody from './FormBody';



const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const DynamicForm = ({ formConstantObject = {}, ...props }) => {
    // ? FOR test uncomment this
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Submitting Form! Form data:', context.formState)
    // }

    return (
        <form>
            <FormBody formConstants={Object.keys(formConstantObject)} formConstantObject={formConstantObject} />
        </form>
    );
};

DynamicForm.propTypes = {

};

export default memo(DynamicForm);