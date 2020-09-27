import React from 'react';
import FormDataProvider from "./FormDataProvider";
import DynamicForm from './DynamicForm';


export const MainForm = ({ formConstants = [], formConstantObject = {} }) => {

    console.log('==============MainForm======================');

    return (
        <FormDataProvider formConstants={formConstants}  >
            <DynamicForm formConstantObject={formConstantObject} />
        </FormDataProvider >
    )

}