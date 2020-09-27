import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';
import clsx from 'clsx';
import {
    BarChart as ReBarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Text from '../Text';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(1, 0, 0, 1),
        background: theme.palette.ascents.systemWhite,
        marginTop: ({ marginTop }) => marginTop
        // width: ({ width }) => width,
        // height: ({ height }) => height,
    },
    title: {
        textAlign: "center",
        padding: theme.spacing(2, 0),
    }
}));

const data = [
    {
        name: 'HR', roles: 10, amt: 10,
    },
    {
        name: 'Policy Admin', roles: 20, amt: 20,
    },
    {
        name: 'Underwriter', roles: 15, amt: 15,
    },
    {
        name: 'Claims Admin', roles: 12, amt: 12,
    },
    {
        name: 'Sales Agent', roles: 50, amt: 50,
    },
];

const BarChart = ({ stroke, className, marginTop = 0, title, width = 400, height = 400, children, ...props }) => {

    const classes = useStyles({ width, height, marginTop });

    return (
        <Box className={classes.root}>
            <Text variant="subtitle1" className={classes.title}>{title}</Text>
            <ResponsiveContainer width={"100%"} height={height}>
                <ReBarChart
                    data={data}
                    margin={{
                        top: 30, right: 45, left: 0, bottom: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="roles" fill="#5F68D9" />
                </ReBarChart>
            </ResponsiveContainer>
        </Box>
    );
};

BarChart.propTypes = {

};

export default BarChart;