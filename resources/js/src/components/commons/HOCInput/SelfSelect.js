import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, FormControl, InputLabel, Select as MUISelect } from '@material-ui/core';
import clsx from 'clsx';
import { styledBy } from '../../../helpers/styles';
import DropdownItem from '../Dropdown/DropdownItem';
import { validAscents } from '../../../constants/propTypesValidation';



const useStyles = makeStyles((theme) => ({
    input: {
        '&:after': {
            borderBottomColor: styledBy('ascent', theme.palette.ascents),
        },
    },

    label: {
        color: theme.palette.text.primary,
        '&.MuiInputLabel-shrink': {
            color: styledBy('ascent', theme.palette.ascents),
        }
    },
}));


const SelfSelect = ({
    ascent = "honey",
    className,
    labelId = `select-${Date.now()}`,
    id = `select-input-${Date.now()}`,
    label,
    options = [],
    ...props
}) => {

    const classes = useStyles({ ascent });

    const [value, setValue] = useState();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const Options = (each, i) => (
        <DropdownItem key={i} value={each.value}>{each.label}</DropdownItem>
    )

    const Input = (
        <FormControl fullWidth>
            <InputLabel className={clsx(classes.label, className)} id={labelId}>{label}</InputLabel>
            <MUISelect
                labelId={labelId}
                id={id}
                id="demo-simple-select"
                value={value}
                onChange={handleChange}
                className={clsx(classes.input, className)}
                {...props}
            >
                {
                    options.map(Options)
                }
            </MUISelect>
        </FormControl>
    )

    return [value, Input];
};

SelfSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    ascent: validAscents
};

export default SelfSelect;