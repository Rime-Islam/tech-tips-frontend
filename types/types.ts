type role = "user" | "admin";

export interface IUser {
    _id?: string; 
    name: string; 
    email: string;
    password: string;
    profilePicture?: string;  
    followers?: string[];  
    following?: string[];  
    verified: boolean;  
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
    authorId: string; 
    authorName: string;  
    images?: string[];  
    category: string;  
    tags?: string[];  
    isPremium: boolean;  
    createdAt: Date;  
    updatedAt?: Date; 
    upvotes: number; 
    comments: IComment[];  
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