


import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

interface Post {
    createdAt: string;
}

interface PostChartsProps {
    postData: Post[];
}

const PostCharts: React.FC<PostChartsProps> = ({ postData }) => {

    const formattedData = (postData ?? []).reduce((acc: Record<string, number>, user) => {
        const month = dayjs(user.createdAt).format('DD-MM-YYYY');
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    
    const labels = Object.keys(formattedData);
    const data = Object.values(formattedData);

    const chartsData = {
        labels,
        datasets: [
            {
                label: "Number of Users Created",
                data,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',

            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: "Post Created by Month",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of Posts"
                },
            },
        },
    };


    return (
        <div className="max-w-2xl">
            <Line data={chartsData} options={options}/>
        </div>
    ) 
};

export default PostCharts;