import React from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const BarChart = ({ dataIncome, dataExpenses, barColorOne, barColorTwo }) => {

    const data = {
        type: 'bar',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: "Income",
                backgroundColor: barColorOne,
                data: dataIncome,
                fill: false
            },
            {
                label: "Expenses",
                backgroundColor: barColorTwo,
                data: dataExpenses,
                fill: false
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
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Bar data={data} options={options}/>
        </div>
    );
};
export default BarChart;