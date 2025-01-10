"use client"
import Sidebar from "@/component/Home/Sidebar";
import ProfileSidebar from "@/component/Profile/ProfileSidebar";
import UserProfile from "@/component/Profile/UserProfile";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
       <div className=" container mx-auto">
       <div className="border-b-2 border-gray-300 dark:border-gray-100">
       <UserProfile />
       </div>
      <div>

      </div>
      <div className="px-1">{children}</div>
       </div>
    );
  };
  
  export default layout;