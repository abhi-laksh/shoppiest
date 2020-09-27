import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import Button from "../Button/Button";

import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2, 0, 2, 0),
  },
  input: {
    display: "none",
  },
  label: {},
  inputLabel: {
    padding: theme.spacing(1, 1.5, 1, 1.5),
    maxWidth: "50%",
  },
  previewImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxHeight: "150px",
  },
  previewImgParent: {
    width: ({ width }) => width,
    height: ({ height }) => height,
    maxWidth: "100%",
  },
  imageName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const FileInput = ({
  accept,
  isImage = false,
  width = "auto",
  height = "auto",
  onChange,
  ascent,
  buttonLabel = "Choose File",
  id,
  label = "No Input",
  className,
  children,
  previewImg,
  imageName,
  ...props
}) => {
  const classes = useStyles({ ascent, width, height });

  return (
    <div className={clsx(classes.root, className)}>
      <Typography className={classes.label}>{label}</Typography>
      <Button
        component="label"
        htmlFor={id}
        className={classes.inputLabel}
        variant="outlined"
        ascent={"systemMetalLight"}
      >
        {previewImg ? (
          <div className={classes.previewImgParent}>
            <img
              src={previewImg}
              alt={imageName}
              className={classes.previewImg}
            />
            <Typography variant="body2" className={classes.imageName}>
              {imageName}
            </Typography>
          </div>
        ) : (
            <>
              <AttachFileIcon fontSize="small" />
              <Typography variant="body2">{buttonLabel}</Typography>
            </>
          )}

        <input
          accept={accept}
          type="file"
          onChange={onChange}
          className={classes.input}
          {...props}
        />
      </Button>
    </div>
  );
};

FileInput.propTypes = {};

export default FileInput;
