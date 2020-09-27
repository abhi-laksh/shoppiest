import React from 'react';
import PropTypes from 'prop-types';
import { List as MUIList, makeStyles, ListItem } from '@material-ui/core';
import { validAscents } from '../../../constants/propTypesValidation';
import { styledBy, fadeAscentColor } from '../../../helpers/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        textTransform: "capitalize",
        '&.MuiList-button': {

            '&.active, &:hover': {
                backgroundColor: fadeAscentColor(theme),
            },

            '& .MuiTouchRipple-child': {
                backgroundColor: styledBy('ascent', theme.palette.ascents)
            }
        },

    }
}));


const List = ({ ascent = "primary", className, children, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <MUIList className={clsx(classes.root, className)} {...props}>
            <ListItem>
                {children}
            </ListItem>
        </MUIList>
    );
};

List.propTypes = {
    ascent: validAscents,
    color: validAscents,
    active: PropTypes.bool,
};

export default List;