import dayjs from "dayjs";
import { Line,Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title, ArcElement);

interface Post {
    createdAt: string;
    comments: any[];
    upvotesCount: number;
}

interface PostChartsProps {
    postData: Post[];
}

const PostCharts: React.FC<PostChartsProps> = ({ postData }) => {
console.log(postData)
    const formattedData = (postData ?? []).reduce((acc: Record<string, number>, user) => {
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
                position: 'top' as const,
            },
            title: {
                display: true,
                text: "Posts Created by Date",
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


 const totalComments = postData?.reduce((sum, post) => sum + post.comments.length, 0);
    const totalUpvotes = postData?.reduce((sum, post) => sum + post.upvotesCount, 0);

    const donutData = {
        labels: ["Total Comments", "Total Upvotes"],
        datasets: [
            {
                data: [totalComments, totalUpvotes],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"]
            },
        ],
    };

    const donutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: "Total Comments and Upvotes",
            },
        },
    };


    return (
        <div className="max-w-2xl">
            <div>
            <Line data={chartsData} options={options}/>
            </div>

            <div className="mt-20">
            <Doughnut data={donutData} options={donutOptions} />
            </div>
        </div>
    ) 
};

export default PostCharts;