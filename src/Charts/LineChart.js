import React from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const LineChart = ({ dataIn, lineColor, scaleDisplay, lineWidth }) => {

    const data = {
        type: 'line',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: "Total Value",
                data: dataIn,
                tension: 0.1,
                fill: false
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        pointRadius: 0,
        borderColor: lineColor,
        borderCapStyle: 'round',
        borderWidth: lineWidth,
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
export default LineChart;