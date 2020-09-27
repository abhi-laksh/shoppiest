import React from 'react';
import PropTypes from 'prop-types';
import Chart from "react-google-charts";

const data = [
    ['State', 'Latitude'],
    ['Andhra Pradesh', 36],
    ['Arunachal Pradesh', -8],
    ['Gujarat', 6],
    ['Rajasthan', -24],
    ['Punjab', -24],
    ['Mizoram', -24],
    ['West Bengal', -24],
    ['Chandigarh', -24],
    ['Delhi', -24],
    ['Ladakh', -24],
];

const GeoChart = props => {
    return (
        <Chart
            width={'500px'}
            height={'516px'}
            chartType="GeoChart"
            data={data}
            options={{
                region: '034', // India
                colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
                backgroundColor: '#fff',
                datalessRegionColor: '#f8bbd0',
                defaultColor: '#f5f5f5',
            }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="YOUR_KEY_HERE"
            rootProps={{ 'data-testid': '4' }}
        />
    );
};

GeoChart.propTypes = {

};

export default GeoChart;