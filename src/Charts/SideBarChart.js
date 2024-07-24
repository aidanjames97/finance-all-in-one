import React from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const SideBarChart = ({ dataIn, barColorOne, fillColor, label, sugMin, sugMax }) => {
    const data = {
        labels: label,
        datasets: [
            {
                label: label,
                data: [dataIn],
                borderWidth: 1,
                borderColor: barColorOne,
                backgroundColor: fillColor,
            }
        ]
    }

    const options = {
        responsive: true,
        events: ['click, onHover'],
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend : {
                display: false,
            },
        },
        scales: {
            x: {
                suggestedMin: sugMin,
                suggestedMax: sugMax,
                display: false,
            },
            y: {
                display: false,
            },
        },
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Bar data={data} options={options}/>
        </div>
    );
};
export default SideBarChart;