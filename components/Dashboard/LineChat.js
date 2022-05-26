import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'  ,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
const data1=[10,15,77,40,89,60,70,23,85,100,110,120,130,130,89,10,20,77,40,89,60,70,23,85,100,110,50,14,89,300]
const data2=[20,12,67,89,50,34,70,23,90,134,83,120,56,140,45,10,20,77,40,89,60,70,23,85,100,110,120,130,89,300]

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: data1.map((d) =>  d),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: data2.map((d) => d),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function LineChart() {
  return <Line 
  options={options} 
  data={data}
  width={600}
  height={300}

   />;
}
