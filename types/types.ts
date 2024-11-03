type role = "user" | "admin";

export interface IUser {
    _id?: any; 
    name: string; 
    email: string;
    password: string;
    confirmPassword?: string;
    profilePicture?: string;  
    followers?: string[];  
    following?: string[];  
    status?: string;  
    isDelete: boolean;  
    phone?: string;
    bio?: string;
    address?: string;  
    transactionId?: string;  
    role: role;  
    premium: boolean; 
    updatedAt: number;
};

export interface IPost {
    _id?: string ;  
    title: string;  
    content: string;  
    user?: IUser;  
    images?: string;  
    category: string;  
    tags?: string[];  
    isPremium: boolean;  
    description: string;  
    upvotesCount?: number; 
    comments?: IComment[] | undefined; 
    createdAt?: string | undefined; 
  };

  export interface Filter {
    category: string;
  }

  export interface PostState {
    post: IPost[];
    filteredPost: IPost[];
    filters: Filter; 
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