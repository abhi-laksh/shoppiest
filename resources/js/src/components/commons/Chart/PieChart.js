import React, { PureComponent, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';
import clsx from 'clsx';
import { PieChart as RePieChart, Cell, Pie, Sector, ResponsiveContainer } from 'recharts';
import Text from '../Text';


const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(1, 0, 0, 1),
        background: theme.palette.ascents.systemWhite,
        marginTop: ({ marginTop }) => marginTop,
        // width: ({ width }) => width,
        // height: ({ height }) => height,
        "& svg": {
            transform: "scale(1.5)",
        }
    },
    title: {
        textAlign: "center",
        padding: theme.spacing(2, 0),
    }
}));

const data = [
    { name: 'Group A', value: 200 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 400 },
];

const COLORS = ['#00A2E0', '#78db4d', '#5F68D9', '#ffa357'];

const LABEL = ["HR", "SFA", "UW", "Claims"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" fontSize={8} fontWeight={700} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${LABEL[index]}`}
            {`\n${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const PieChart = ({ stroke, className, marginTop = 0, title, width = 400, height = 400, children, ...props }) => {

    const classes = useStyles({ width, height, marginTop });

    const [state, setState] = useState({
        activeIndex: 0,
    });

    const onPieEnter = (data, index) => {
        setState({
            ...state,
            activeIndex: index,
        });
    };

    return (
        <Box className={classes.root}>
            <Text variant="subtitle1" className={classes.title}>{title}</Text>
            <ResponsiveContainer width={"100%"} height={height}>
                <RePieChart>
                    <Pie
                        data={data}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                </RePieChart>
            </ResponsiveContainer>
        </Box>
    );
};


export default PieChart;