"use client"
import Sidebar from "@/component/Home/Sidebar";
import UserPost from "@/component/Post/UserPost";
import ProfileSidebar from "@/component/Profile/ProfileSidebar";
import UserProfile from "@/component/Profile/UserProfile";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
       <div>
        <UserProfile />
        <ProfileSidebar />
      <div className="px-1">{children}</div>
       </div>
    );
  };
  
  export default layout;