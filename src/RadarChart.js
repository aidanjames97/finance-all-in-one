import React from 'react'
import 'chart.js/auto'
import { Radar } from 'react-chartjs-2'

const RaderChart = ({ dataSpending, dataSpendingTypes }) => {

    const data = {
        type: 'radar',
        labels: dataSpendingTypes,
        datasets: [
            {
                label: "Spending",
                backgroundColor: 'rgba(0, 255, 80, 0.1)',
                borderColor: 'rgba(0, 255, 80, 0.4)',
                pointBackgroundColor: 'rgba(0, 255, 80, 1)',
                data: dataSpending,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend : {
                display: false,
            },
        },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 50,
                ticks: {
                    display: false
                },
                pointLabels: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255,255,255, 0.2)'
                },
                angleLines: {
                    color: 'rgba(255,255,255, 0.7)'
                },
            },
        },
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Radar data={data} options={options}/>
        </div>
    );
};
export default RaderChart;