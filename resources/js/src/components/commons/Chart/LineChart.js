import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';
import clsx from 'clsx';
import {
    LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
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
        name: '0 Week', mostLoggedIn: 120, mostLoggedOut: 75, amt: 2400,
    },
    {
        name: '2nd Week', mostLoggedIn: 90, mostLoggedOut: 35, amt: 2210,
    },
    {
        name: '1st Week', mostLoggedIn: 156, mostLoggedOut: 45, amt: 2400,
    },
    {
        name: '3rd Week', mostLoggedIn: 136, mostLoggedOut: 60, amt: 2290,
    },
    {
        name: '4th Week', mostLoggedIn: 60, mostLoggedOut: 25, amt: 2000,
    },
];

const LineChart = ({ stroke, title, className, marginTop = 0, width = 400, height = 400, children, ...props }) => {

    const classes = useStyles({ width, height, marginTop });

    return (
        <Box className={classes.root}>
            <Text variant="subtitle1" className={classes.title}>{title}</Text>
            <ResponsiveContainer width={"100%"} height={height}>
                <ReLineChart
                    // width={width}
                    // height={height}
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
                    <Line type="natural" name="Most Logged In" dataKey="mostLoggedIn" stroke="#69C540" activeDot={{ r: 8 }} />
                    <Line type="natural" name="Most Logged Out" dataKey="mostLoggedOut" stroke="#F58323" activeDot={{ r: 8 }} />
                </ReLineChart>
            </ResponsiveContainer>
        </Box>
    );
};

LineChart.propTypes = {

};

export default LineChart;