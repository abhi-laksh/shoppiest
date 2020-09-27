import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import ModaTitle from './ModaTitle';
import { styledBy } from '../../../helpers/styles';
import { validAscents } from '../../../constants/propTypesValidation';
import ModalFormTitle from './ModalFormTitle';

const useStyle = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper': {
            backgroundColor: styledBy('bgAscent', theme.palette.ascents)
        }
    },
    body: {
        padding: theme.spacing(2),
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: styledBy('borderAscent', theme.palette.ascents)
    }
}))


const ModalForm = ({
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
        <Card aria-labelledby={id} onClose={onClose} className={classes.root} {...props}>
            {
                title && (
                    <ModalFormTitle id={id} ascent={textAscent} onClose={onClose}>
                        {title}
                    </ModalFormTitle>
                )
            }
            {
                children && (
                    <CardContent className={classes.body}>
                        {
                            disableTypography ? (children) : (
                                <Typography align={align}>
                                    {children}
                                </Typography>
                            )
                        }
                    </CardContent>
                )
            }
            {
                action && (
                    <CardActions>
                        {action}
                    </CardActions>
                )
            }
        </Card>
    );
};

ModalForm.propTypes = {
    textAscent: validAscents,
    bgAscent: validAscents,
    borderAscent: validAscents,
    onClose: PropTypes.func,
    disableTypography: PropTypes.bool,
};

export default ModalForm;