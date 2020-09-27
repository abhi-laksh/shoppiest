import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { agentBasicDetailsDTO } from '../../../constants/formConstantArray';
import DynamicInput from './DynamicInput';



const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const FormBody = memo(({ formConstants = [], formConstantObject = {}, ...props }) => {
    const classes = useStyles({});

    return (
        <Grid container spacing={2} >
            {
                formConstants.map((each) => (
                    <DynamicInput
                        key={each}
                        eachWidth={4}
                        formType={formConstantObject[each].type}
                        inputType={formConstantObject[each].inputType}
                        formStateKey={formConstantObject[each].jsonKey}
                        label={formConstantObject[each].label}
                        options={formConstantObject[each].options}
                        isImage={formConstantObject[each].type === "IMAGE"}
                        previewImgWidth={formConstantObject[each].previewImgWidth}
                        previewImgHeight={formConstantObject[each].previewImgHeight}
                    />
                ))
            }
        </Grid>
    );
});

FormBody.propTypes = {

};

export default FormBody;