import React from 'react';
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ colors, allTypes }) => {

    const allTypesMoney = allTypes.map(allTypes => allTypes.d)
    const allTypesLables = allTypes.map(allTypes => allTypes.what)
    const data = {
        labels: allTypesLables,
        datasets: [
        {
            data: allTypesMoney,
            backgroundColor: colors,
            hoverBackgroundColor: ['white'],
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 0,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%'}}>
        <Doughnut data={data} options={options} />
        </div>
    );
};
export default DoughnutChart;