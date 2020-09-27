import React from "react";
import PropTypes from "prop-types";
import { TableCell as MUITableCell, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { styledBy } from "../../../helpers/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0.5, 0, 1.2),
    height: 33,
    fontWeight: 600,
    color: styledBy("color", theme.palette.ascents),
    ...theme.typography.body2,

  },
}));

const TableCell = ({ color, className, ascent = "primary", ...props }) => {
  const classes = useStyle({
    ascent,
    color,
  });
  return <MUITableCell {...props} className={clsx(classes.root, className)} />;
};

TableCell.propTypes = {};

export default TableCell;
