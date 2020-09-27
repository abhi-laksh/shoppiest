import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogActions,
    makeStyles,
    Typography,
} from "@material-ui/core";
import ModaTitle from "./ModaTitle";
import { styledBy } from "../../../helpers/styles";
import { validAscents } from "../../../constants/propTypesValidation";

const useStyle = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: styledBy("bgAscent", theme.palette.ascents),
        },
    },
    body: {
        padding: theme.spacing(2),
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: styledBy("borderAscent", theme.palette.ascents),
    },
  
  body: {
    padding: theme.spacing(2),
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderColor: styledBy("borderAscent", theme.palette.ascents),
  },
  actions:{
    width:"100%"
  }
}));

const Modal = ({
    id = "A modal",
    textAscent,
    bgAscent,
    borderAscent = "primary",
    onClose,
    disableTypography,
    align,
    title,
    children,
    action,
    ...props
}) => {
    const classes = useStyle({ borderAscent, bgAscent });

  return (
    <Dialog
      TransitionProps={{ unmountOnExit: false, enter: false, timeout: 100 }}
      transitionDuration={200}
      aria-labelledby={id}
      onClose={onClose}
      className={classes.root}
      {...props}
    >
      {title && (
        <ModaTitle id={id} ascent={textAscent} onClose={onClose}>
          {title}
        </ModaTitle>
      )}
      {children && (
        <DialogContent className={classes.body}>
          {disableTypography ? (
            children
          ) : (
            <Typography align={align}>{children}</Typography>
          )}
        </DialogContent>
      )}
      {action && <DialogActions className={classes.actions}>{action}</DialogActions>}
    </Dialog>
  );
};

Modal.propTypes = {
    textAscent: validAscents,
    bgAscent: validAscents,
    borderAscent: validAscents,
    onClose: PropTypes.func,
    disableTypography: PropTypes.bool,
};

export default Modal;
