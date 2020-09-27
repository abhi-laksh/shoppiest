import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select as MUISelect,
} from "@material-ui/core";
import clsx from "clsx";
import { styledBy } from "../../../helpers/styles";
import DropdownItem from "../Dropdown/DropdownItem";
import { validAscents } from "../../../constants/propTypesValidation";

const useStyles = makeStyles((theme) => ({
  input: {
    "&:after": {
      borderBottomColor: styledBy("ascent", theme.palette.ascents),
    },
    "& .Mui-required .MuiFormLabel-asterisk": {
      color: theme.palette.ascents.orange,
    },
  },

  label: {
    color: theme.palette.text.primary,
    "&.MuiInputLabel-shrink": {
      color: styledBy("ascent", theme.palette.ascents),
    },
  },
}));

const Select = ({
  ascent = "primary",
  required,
  className,
  parentClassName,
  labelId = `select-${Date.now()}`,
  id = `select-input-${Date.now()}`,
  value,
  onChange,
  fullWidth=true,
  startIcon,
  label,
  options = [],
  ...props
}) => {
  const classes = useStyles({ ascent });

  const Options = (each, i) => (
    <DropdownItem key={i} value={each.value}>
      {each.label}
    </DropdownItem>
  );

  return (
    <FormControl required={required}  fullWidth={fullWidth} className={parentClassName}>
      <InputLabel className={clsx(classes.label, className)} id={labelId}>
        {label}
      </InputLabel>
      <MUISelect
        labelId={labelId}
        startAdornment={startIcon}
        required={required}
        id={id}
        id="demo-simple-select"
        value={value}
        onChange={onChange}
        className={clsx(classes.input, className)}
        {...props}
      >
        {options.map(Options)}
      </MUISelect>
    </FormControl>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  ascent: validAscents,
};

export default Select;
