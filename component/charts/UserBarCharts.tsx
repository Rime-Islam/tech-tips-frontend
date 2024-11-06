import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface User {
    createdAt: string;
}

interface UserBarChartsProps {
    userData: User[];
}

const UserBarCharts: React.FC<UserBarChartsProps> = ({ userData }) => {

    const formattedData = (userData ?? []).reduce((acc: Record<string, number>, user) => {
        const month = dayjs(user.createdAt).format('MM-YYYY');
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
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
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
                text: "User Registrations by Month",
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
                    text: "Number of Users"
                },
            },
        },
    };


    return (
        <div className="max-w-2xl ">
            <Bar data={chartsData} options={options}/>
        </div>
    ) 
};

export default UserBarCharts;