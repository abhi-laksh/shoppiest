import React, { memo, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import clsx from "clsx";
import { FormDataContext } from "./FormDataProvider";
import TextBox from "../Input/TextBox";
import FileInput from "../Input/FileInput";
import Select from "../Input/Select";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const DynamicInput = ({
  previewImgWidth,
  previewImgHeight,
  isImage,
  formStateKey,
  previewImg,
  formType,
  eachWidth,
  inputType,
  label,
  options,
  ...props
}) => {
  const context = useContext(FormDataContext);

  const classes = useStyles({});

  const { formData, setFormState } = context;
  console.log("===============formData=====================");
  console.log(formData);
  console.log("===============formData=====================");

  const handleInputChange = (formType) => {
    switch (formType) {
      case "TEXT":
        return (event) => {
          setFormState({
            [formStateKey]: event.target.value,
          });
        };
      case "SELECT":
        return (event) => {
          setFormState({
            [formStateKey]: event.target.value,
          });
        };
      case "DATE":
        return (event) => {
          setFormState({
            [formStateKey]: event.target.value,
          });
        };
      case "IMAGE":
        return (event) => {
          setFormState({
            [formStateKey]: event.target.files[0],
          });
        };
      case "FILE":
        return (event) => {
          setFormState({
            [formStateKey]: event.target.files[0],
          });
        };
      case "PHONE_BOOK":
        return (event) => {
          setFormState({
            [formStateKey]: {},
          });
        };
      default:
        return (event) => {
          setFormState({
            [formStateKey]: event.target.value,
          });
        };
    }
  };

  switch (formType) {
    case "TEXT":
      return (
        <Grid item xs={12} sm={eachWidth}>
          <TextBox
            value={formData[formStateKey]}
            type={inputType}
            label={label}
            onChange={handleInputChange(formType)}
          />
        </Grid>
      );
    case "SELECT":
      return (
        <Grid item xs={12} sm={eachWidth}>
          <Select
            value={formData[formStateKey]}
            type={inputType}
            label={label}
            options={options}
            onChange={handleInputChange(formType)}
          />
        </Grid>
      );
    case "DATE":
      return (
        <Grid item xs={12} sm={eachWidth}>
          <TextBox
            value={formData[formStateKey]}
            type={inputType}
            labelForDate={label}
            showLabel={false}
            onChange={handleInputChange(formType)}
          />
        </Grid>
      );
    case "IMAGE":
      return (
        <Grid item xs={12} sm={eachWidth}>
          <FileInput
            width={previewImgWidth}
            height={previewImgHeight}
            isImage={isImage}
            label={
              formData[formStateKey] && formData[formStateKey].name
                ? formData[formStateKey].name
                : label
            }
            previewImg={
              formData[formStateKey] &&
              URL.createObjectURL(formData[formStateKey])
            }
            onChange={handleInputChange(formType)}
          />
        </Grid>
      );
    case "PHONE_BOOK":
      return (
        <Grid item xs={12}>
          gjkgk
        </Grid>
      );
    case "FILE":
      return (
        <Grid item xs={12} sm={eachWidth}>
          <FileInput onChange={handleInputChange(formType)} />
        </Grid>
      );
    default:
      return (
        <Grid item xs={12} sm={eachWidth}>
          <TextBox
            value={formData[formStateKey]}
            type={inputType}
            label={label}
            onChange={handleInputChange(formType)}
          />
        </Grid>
      );
  }
};

DynamicInput.propTypes = {};

export default memo(DynamicInput, () => {});
