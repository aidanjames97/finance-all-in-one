import React from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const SideBarChart = ({ dataDaysDue, barColorOne, fillColor }) => {
    const data = {
        labels: ['Jan'],
        datasets: [
            {
                label: "Days Untill Due",
                data: [dataDaysDue],
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
                suggestedMin: 0,
                suggestedMax: 30,
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