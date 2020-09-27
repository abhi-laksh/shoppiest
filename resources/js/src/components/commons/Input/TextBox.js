import React from "react";
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
    "&.MuiInputLabel-asterisk": {
      color: theme.palette.ascents.orange,
    },
  },
  label: {
    color: theme.palette.text.primary,
    "&.MuiInputLabel-shrink": {
      color: styledBy("ascent", theme.palette.ascents),
    },
    "&.MuiInputLabel-asterisk": {
      color: theme.palette.ascents.orange,
    },
  },
  labelForDate: {
    fontSize: 10,
  },
}));

const TextBox = ({
  id,
  ascent,
  disabled,
  endAdornment,
  endAdornmentPosition = "end",
  value,
  type = "text",
  label = "Enter Something",
  showLabel = true,
  onChange = () => {},
  inputClassName = null,
  parentClassName = null,
  labelClassName = null,
  inputProps = null,
  labelProps = null,
  labelForDate,
  readOnly = false,
  ...props
}) => {
  const classes = useStyles({ ascent });

  return (
    <FormControl
      fullWidth
      {...props}
      className={parentClassName}
    >
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
        onChange={onChange}
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
        readOnly={readOnly}
        {...inputProps}
      />
    </FormControl>
  );
};

TextBox.propTypes = {
  ascent: validAscents,
  endAdornmentPosition: PropTypes.oneOf(["start", "end"]),
  endAdornment: PropTypes.node,
  inputProps: PropTypes.object,
  labelProps: PropTypes.object,
  onChange: PropTypes.func,
  showLabel: PropTypes.bool,
};

export default TextBox;
