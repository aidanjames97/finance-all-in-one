import React from 'react';
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChartHalf = ({ info, labels }) => {
    const data = {
        labels: labels,
        datasets: [
        {
            data: info,
            hoverBackgroundColor: ['white'],
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 1,
        circumference: 180,
        rotation: 270,
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
export default DoughnutChartHalf;