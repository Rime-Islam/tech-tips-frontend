import { RootState } from "@/redux/app/store";
import { Filter, IPost, PostState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: PostState = {
    post: [],
    filteredPost: [],
    filters: {
        category: ""
    },
};


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.post = action.payload;
            state.filteredPost = action.payload;
        },
        setFilters: (state, action: PayloadAction<Partial<Filter>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        filterPosts: (state) => {
            state.filteredPost = state.post.filter((item) => {
                const hasFilters = state.filters.category;
            
                if (!hasFilters) {
                    return true;
                   }            
                const matchCategory = state.filters.category ? item.category.toLowerCase().includes(state.filters.category.toLowerCase()) : true;
                console.log(matchCategory)

           
            return matchCategory;

            });
        },
    },
})


export const { setPosts,  setFilters, filterPosts } = postSlice.actions;
export default postSlice.reducer;
export const filteredPost = (state: RootState) => state.post.filteredPost;