import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';
import clsx from 'clsx';
import {
    AreaChart as ReAreaChart,
    Bar,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,


} from 'recharts';
import Text from '../Text';

const data = [
    {
        "name": "0 Hours",
        "Logout": 35,
        "Login": 30,
        "amt": 2400
    },
    {
        "name": "4 Hours",
        "Logout": 5,
        "Login": 100,
        "amt": 2210
    },
    {
        "name": "8 Hours",
        "Logout": 40,
        "Login": 60,
        "amt": 2290
    },
    {
        "name": "12 Hours",
        "Logout": 15,
        "Login": 90,
        "amt": 2000
    },
    {
        "name": "16 Hours",
        "Logout": 25,
        "Login": 40,
        "amt": 2181
    },
    {
        "name": "20 Hours",
        "Logout": 8,
        "Login": 60,
        "amt": 2500
    },
    {
        "name": "24 Hours",
        "Logout": 10,
        "Login": 120,
        "amt": 2100
    }
]

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


const AreaChart = ({ ascent, className, marginTop, title, children, height = 370, ...props }) => {

    const classes = useStyles({ ascent, marginTop });

    return (
        <Box className={classes.root}>
            <Text variant="subtitle1" className={classes.title}>{title}</Text>
            <ResponsiveContainer width={"100%"} height={height}>
                <ReAreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{
                        top: 30, right: 45, left: 0, bottom: 30,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5F68D9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#5F68D9" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#69C540" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#69C540" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Logout" stroke="#5F68D9" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="Login" stroke="#69C540" fillOpacity={1} fill="url(#colorPv)" />
                </ReAreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

AreaChart.propTypes = {

};

export default AreaChart;