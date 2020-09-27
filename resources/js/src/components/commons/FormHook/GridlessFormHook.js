import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    makeStyles,
    Grid,
    Checkbox,
    FormControlLabel,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import TextBox from "../Input/TextBox";
import HOCTextBox from "../HOCInput/TextBox";
import Select from "../Input/Select";
import FileInput from "../Input/FileInput";
import { useForm, Controller } from "react-hook-form";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Text from "../Text";

const useStyles = makeStyles((theme) => ({
    root: {},
    label: {
        "& .Mui-required .MuiFormLabel-asterisk": {
            color: theme.palette.ascents.orange,
        },
    },
    checkLabel: {
        "& .MuiTypography-body1": {
            fontSize: "12px",
        },
    },
}));

const GridlessFormHook = ({
    formConstant,
    formLabel = null,
    formValue,
    handleFormInput = () => { },
    handleFileInput = () => { },
    addPhoneHandler = () => { },
    deletePhoneHandler = () => { },
    viewMode,
    eachWidth = 4,
    ascent,
    className,
    control,
    children,
    ...props
}) => {
    const classes = useStyles({ ascent });

    const FormType = (eachJSONKey, index) => {
		/* 
		  Aap purana wala code ke sath kam krdo,
		  sirf apne branch m push rkhiye ga iska alag branch create
		  krke hm isko solve krdnge.
		  Ye baat meet m boldete pr scha thora aur time waste krlete hain
		*/
        switch (formConstant[eachJSONKey].type) {
            case "TEXT":
                return (
                    <Controller
                        key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
                        defaultValue={""}
                        as={
                            <TextBox
                                parentClassName={classes.label}
                                type={formConstant[eachJSONKey].inputType}
                                label={formConstant[eachJSONKey].label}
                                readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
                            />
                        }
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
                                : formConstant[eachJSONKey].jsonKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
            case "SELECT":
                return (
                    <Controller
                        key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
                        defaultValue={""}
                        as={
                            <Select
                                parentClassName={classes.label}
                                label={formConstant[eachJSONKey].label}
                                options={formConstant[eachJSONKey].options}
                                readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
                            />
                        }
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
                                : formConstant[eachJSONKey].jsonKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
            case "DATE":
                return (
                    <Controller
                        defaultValue={""}
                        as={
                            <TextBox
                                parentClassName={classes.label}
                                type={formConstant[eachJSONKey].inputType}
                                labelForDate={formConstant[eachJSONKey].label}
                                showLabel={false}
                                readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
                            />
                        }
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
                                : formConstant[eachJSONKey].jsonKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
            case "CHECK":
                return (
                    <Controller
                        defaultValue={0}
                        render={({ name, onChange, value }) => (
                            <>
                                <Checkbox
                                    // checked={formValue[eachJSONKey] === 1 ? true : false}
                                    onChange={(e) => {
                                        onChange((
                                            e.target.checked ? 1 : 0
                                        ))
                                    }}
                                    color="primary"
                                    size="small"
                                    value={value}
                                    name={name}
                                    id={formConstant[eachJSONKey].jsonKey}
                                />
                                <Text htmlFor={formConstant[eachJSONKey].jsonKey} component={"label"}>{formConstant[eachJSONKey].label}</Text>
                            </>
                        )}
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
                                : formConstant[eachJSONKey].jsonKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
            case "IMAGE":
                return (
                    <Controller
                        defaultValue={""}
                        render={({ onChange, name, value }) => (
                            <FileInput
                                onChange={(e) => onChange(e.target.files)}
                                name={name}
                                // value={value}
                                width={formConstant[eachJSONKey].width}
                                height={formConstant[eachJSONKey].height}
                                isImage={formConstant[eachJSONKey].isImage}
                                readOnly={formConstant[eachJSONKey].isReadOnly}
                                label={formConstant[eachJSONKey].label}
                                previewImg={
                                    value && value.length > 0 && URL.createObjectURL(value[0])
                                }
                                imageName={value && value.length > 0 && value[0].name}
                                accept={formConstant[eachJSONKey].accept}
                            />
                        )}
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
                                : formConstant[eachJSONKey].jsonKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
            case "FILE":
                return (
                    <Controller
                        defaultValue={""}
                        as={
                            <FileInput
                                label={formConstant[eachJSONKey].label}
                                width={formConstant[eachJSONKey].width}
                                height={formConstant[eachJSONKey].height}
                                readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
                                accept={formConstant[eachJSONKey].accept}
                            />
                        }
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
                                : formConstant[eachJSONKey].jsonKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
            default:
                return (
                    <Controller
                        defaultValue={""}
                        as={
                            <TextBox
                                parentClassName={classes.label}
                                type={formConstant[eachJSONKey].inputType}
                                label={formConstant[eachJSONKey].label}
                                readOnly={formConstant[eachJSONKey].isReadOnly}
                                inputProps={{
                                    style: formConstant[eachJSONKey].style
                                }}
                            />
                        }
                        control={control}
                        name={
                            formConstant[eachJSONKey].object
                                ? `${formConstant[eachJSONKey].object}-${eachJSONKey}`
                                : eachJSONKey
                        }
                        rules={formConstant[eachJSONKey].rules}
                    />
                );
        }
    };

    return (Object.keys(formConstant).map(FormType));
};

GridlessFormHook.propTypes = {};

export default GridlessFormHook;




{/* <Grid key={eachJSONKey} item xs={12} sm={eachWidth}>
<Controller
  defaultValue={""}
  as={
    <TextBox
      parentClassName={classes.label}
      required={formConstant[eachJSONKey].required}
      control={control}
      type={formConstant[eachJSONKey].inputType}
      label={formConstant[eachJSONKey].label}
      readOnly={formConstant[eachJSONKey].isReadOnly}
    />
  }
  control={control}
  name={
    formConstant[eachJSONKey].object
      ? `${formConstant[eachJSONKey].object}-${eachJSONKey}`
      : eachJSONKey
  }
  rules={formConstant[eachJSONKey].rules}
/>
</Grid> */}