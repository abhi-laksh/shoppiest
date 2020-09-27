import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as MUIListItem, makeStyles } from '@material-ui/core';
import { validAscents } from '../../../constants/propTypesValidation';
import { styledBy, fadeAscentColor } from '../../../helpers/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        textTransform: "capitalize",
        '&.MuiListItem-button': {

            '&.active, &:hover': {

                backgroundColor: fadeAscentColor(theme),
            },

            '& .MuiTouchRipple-child': {
                backgroundColor: styledBy('ascent', theme.palette.ascents)
            }
        },
        '&.active .MuiTypography-root': {
            color: (theme.palette.text.primary),
        },
        '&.active .MuiTypography-root': {
            color: styledBy('ascent', theme.palette.ascents),
        },
        '&:hover':{
            cursor:"pointer"
        }
    }
}));


const ListItem = ({ ascent = "primary", className, children, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <MUIListItem className={clsx(classes.root, className)} {...props}>
            {children}
        </MUIListItem>
    );
};

ListItem.propTypes = {
    ascent: validAscents,
    color: validAscents,
    active: PropTypes.bool,
};

export default ListItem;