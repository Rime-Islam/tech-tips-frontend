type role = "user" | "admin";

export interface IUser {
    _id?: string; 
    name: string; 
    email: string;
    password: string;
    confirmPassword?: string;
    profilePicture?: string;  
    followers?: string[];  
    following?: string[];  
    isVerified: boolean;  
    phone?: string;
    bio?: string;
    address?: string;  
    role: role;  
    premium: boolean; 
};

export interface IPost {
    _id?: string;  
    title: string;  
    content: string;  
    user?: string;  
    images?: string;  
    category: string;  
    tags?: string[];  
    isPremium: boolean;  
    description: string;  
    upvotesCount?: number; 
    comments?: IComment[] | undefined; 
    createdAt?: string | undefined; 
  };
  
  export interface IComment {
    _id?: string;  
    userId: string;  
    userName: string;  
    comment: string;  
    createdAt: Date;  
    updatedAt?: Date;  
  };

  export type TProps = {
    com: IComment;
    item: IPost;
  };