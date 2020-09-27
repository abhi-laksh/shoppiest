import React from "react";

import clsx from "clsx";
import { makeStyles, Button as MUIButton } from "@material-ui/core";

import { styledBy, fadeAscentColor } from "../../../helpers/styles";
import { validAscents } from "../../../constants/propTypesValidation";

const useStyle = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
    backgroundColor: styledBy("ascent", theme.palette.ascents),
    color: styledBy("colorAscent", theme.palette.ascents),
    fontSize: (fontSize) => fontSize,
    "&:hover": {
      backgroundColor: styledBy("ascent", theme.palette.contrast),
    },
  },
  outlined: {
    ...theme.typography.body2,
    color: styledBy("ascent", theme.palette.ascents),
    fontSize: (fontSize) => fontSize,
    borderColor: fadeAscentColor(theme, 0.5),
    "&:hover": {
      borderColor: styledBy("ascent", theme.palette.contrast),
    },
  },
}));

const Button = ({
  form,
  type,
  className,
  fontSize = 10,
  children,
  ascent = null,
  variant = "contained",
  colorAscent,
  color = "primary",
  fullWidth = false,
  ...props
}) => {
  const classes = useStyle({ ascent, fontSize, colorAscent });

  return (
    <MUIButton
      form={form}
      type={type}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      className={clsx(
        {
          [classes.root]: variant !== "outlined",
          [classes.outlined]: variant === "outlined",
        },
        className
      )}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

Button.propTypes = {
  ascent: validAscents,
};

export default Button;
