"use client"
import AdminSidebar from "@/component/Profile/AdminSidebar";
import DashboardNavber from "@/component/UI/DashboardNavber";

import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
       <div className="bg-gray-100 dark:bg-gray-800">
       <div className="border-b-2 bg-white pt-[8vh]  h-[100vh] w-56 border-gray-300 dark:border-gray-100">
       <AdminSidebar />
         
       </div>
     
      <div>
      <DashboardNavber />
      </div>
      <div className="px-1">{children}</div>
       </div>
    );
  };
  
  export default layout;