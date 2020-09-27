import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import clsx from 'clsx';
import TextBox from './Input/TextBox';
import Select from './Input/Select';
import FileInput from './Input/FileInput';



const useStyles = makeStyles((theme) => ({
    root: {

    },
    checkLabel:{
        '& .MuiTypography-body1':{
            fontSize:"12px"
        }
    }
}));


const GenerateForm = ({
    formConstant,
    formValue,
    readOnly,
    handleFormInput = () => { },
    handleFileInput = () => { },
    eachWidth = 4,
    ascent,
    className,
    children,
    ...props
}) => {

    const classes = useStyles({ ascent });

    const FormType = (eachJSONKey,index) => {
        switch (formConstant[eachJSONKey].type) {
            case "TEXT":
                return (
                    <Grid item xs={12} sm={eachWidth}>
                        <TextBox
                            readOnly={readOnly}
                            value={formValue[eachJSONKey]}
                            type={formConstant[eachJSONKey].inputType}
                            label={formConstant[eachJSONKey].label}
                            onChange={handleFormInput(eachJSONKey)}
                        />
                    </Grid>
                );
            case "SELECT":
                return (
                    <Grid key={index} item xs={12} sm={eachWidth}>
                        <Select
                            readOnly={readOnly}
                            value={formValue[eachJSONKey]?formValue[eachJSONKey]:""}
                            type={formConstant[eachJSONKey].inputType}
                            label={formConstant[eachJSONKey].label}
                            options={formConstant[eachJSONKey].options}
                            onChange={handleFormInput(eachJSONKey)}
                        />
                    </Grid>
                );
            case "DATE":
                return (
                    <Grid item xs={12} sm={eachWidth}>
                        <TextBox
                            value={formValue[eachJSONKey]}
                            type={formConstant[eachJSONKey].inputType}
                            labelForDate={formConstant[eachJSONKey].label}

                            readOnly={readOnly}
                            showLabel={false}
                            onChange={handleFormInput(eachJSONKey)}
                        />
                    </Grid>
                );
            case "CHECK":
                return(
                    <Grid key={index} item xs={12} sm={eachWidth}>
                        <FormControlLabel
                            control={
                            <Checkbox 
                            readOnly={readOnly}
                            checked={formValue[eachJSONKey]===1?true:false}
                            onChange={handleFormInput(eachJSONKey,formConstant[eachJSONKey].type)}
                            color="primary"  size="small"/>
                            }
                            
                            label={formConstant[eachJSONKey].label}
                            className={classes.checkLabel}
                            labelPlacement="end"
                            />
                        
                    </Grid>
                )
            case "IMAGE":
                return (
                    <Grid item xs={12} sm={eachWidth}>
                        <FileInput
                            readOnly={readOnly}
                            width={formConstant[eachJSONKey].width}
                            height={formConstant[eachJSONKey].height}
                            isImage={formConstant[eachJSONKey].isImage}
                            onChange={handleFileInput(eachJSONKey)}
                        />
                    </Grid>
                );
            case "FILE":
                return (
                    <Grid item xs={12} sm={eachWidth}>
                        <FileInput
                            width={formConstant[eachJSONKey].width}
                            height={formConstant[eachJSONKey].height}
                            onChange={handleFileInput(eachJSONKey)}
                        />
                    </Grid>
                );
            default:
                return;

        }
    }

    return (
        <Grid container spacing={3} >
            {Object.keys(formConstant).map(FormType)}
        </Grid>
    );
};

GenerateForm.propTypes = {

};

export default GenerateForm;