"use client"
import UserBarCharts from "@/component/charts/UserBarCharts";
import { useGetAllUserQuery } from "@/redux/app/feature/api/user/useApi";


const page = () => {
    const {data, isLoading} = useGetAllUserQuery(undefined);
    const userData = data?.data;
    console.log(userData)
    
    return (
        <div>
        <UserBarCharts userData={userData}/>
        </div>
    )
};

export default page;