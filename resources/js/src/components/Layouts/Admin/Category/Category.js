import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Table from '../../../commons/Table/Table';
import { categoryHeadCells } from '../../../../constants/headCells';



const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const Category = ({ ascent, className, children, ...props }) => {

    const classes = useStyles({ ascent });
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Table
            headCells={categoryHeadCells}
            rowsPerPage={{ rowsPerPage, handleRowsPerPage }}
        />
    );
};

Category.propTypes = {

};

export default Category;