import React from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const DoubleLineChart = ({ dataIn, lineColor, scaleDisplay, lineWidth, dataTwo }) => {

    const data = {
        type: 'line',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: "Total Value",
                data: dataIn,
                tension: 0.1,
                borderColor: lineColor,
                borderWidth: lineWidth,
                fill: false
            }, {
                label: "Open",
                data: dataTwo,
                tension: 0.1,
                borderColor: 'grey',
                borderWidth: 1,
                fill: false
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        pointRadius: 0,
        borderCapStyle: 'round',
        plugins: {
            legend : {
                display: false,
            },
        },
        scales: {
            y: {
                display : scaleDisplay,
            },
            x: {
                display: scaleDisplay,
            }
        },
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Line data={data} options={options}/>
        </div>
    );
};
export default DoubleLineChart;