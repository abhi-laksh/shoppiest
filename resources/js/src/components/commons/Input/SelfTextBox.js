import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { styledBy } from "../../../helpers/styles";
import clsx from "clsx";
import { validAscents } from "../../../constants/propTypesValidation";

const useStyles = makeStyles((theme) => ({
  input: {
    "&:after": {
      borderBottomColor: styledBy("ascent", theme.palette.ascents),
    },
  },
  label: {
    color: theme.palette.text.primary,
    "&.MuiInputLabel-shrink": {
      color: styledBy("ascent", theme.palette.ascents),
    },
  },
}));

const SelfTextBox = ({
  id,
  ascent,
  endAdornment,
  endAdornmentPosition = "end",
  type = "text",
  label = "Enter Something",
  showLabel = true,
  inputClassName = null,
  labelClassName = null,
  inputProps = null,
  labelProps = null,
  reset = false,
  inputValue,
  labelForDate,
  ...props
}) => {
  const [value, setValue] = useState(inputValue);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const classes = useStyles({ ascent });

  useEffect(() => {
    reset && setValue("");
  }, [reset]);

  useEffect(() => {
    inputValue && setValue(inputValue);
  }, [inputValue]);

  const input = (
    <FormControl fullWidth {...props}>
      {showLabel ? (
        <InputLabel
          className={clsx(classes.label, labelClassName)}
          htmlFor={id}
          {...labelProps}
        >
          {label}
        </InputLabel>
      ) : labelForDate ? (
        <Typography
          className={clsx(classes.label, classes.labelForDate, labelClassName)}
        >
          {labelForDate}
        </Typography>
      ) : null}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={handleInput}
        ascent={ascent}
        className={clsx(classes.input, inputClassName)}
        placeholder={!showLabel ? label : null}
        endAdornment={
          endAdornment ? (
            <InputAdornment position={endAdornmentPosition}>
              {endAdornment}
            </InputAdornment>
          ) : null
        }
        {...inputProps}
      />
    </FormControl>
  );

  return [value, input];
};

SelfTextBox.propTypes = {
  ascent: validAscents,
  endAdornmentPosition: PropTypes.oneOf(["start", "end"]),
  endAdornment: PropTypes.node,
  inputProps: PropTypes.object,
  labelProps: PropTypes.object,
  showLabel: PropTypes.bool,
};

export default SelfTextBox;
