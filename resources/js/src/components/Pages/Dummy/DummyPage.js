import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Button from '../../commons/Button/Button';
import Base from '../../Layouts/Admin/Base';



const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const DummyPage = ({ ascent, className, children, ...props }) => {

    const classes = useStyles({ ascent });

    return (
        <Base>
            <Button
                ascent="primary"
            >
                Hellow
            </Button>
        </Base>
    );
};

DummyPage.propTypes = {

};

export default DummyPage;