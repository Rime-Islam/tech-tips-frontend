import { baseApi } from "../baseApi/baseApi";



const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (data) => {
                return {
                    url: "/post/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["posts"],
        }),
        updatePost: builder.mutation({
            query: ({ postId, postData }) => {
                return {
                    url: `/post/update-post/${postId}`,
                    method: "PATCH",
                    body: postData,
                };
            },
            invalidatesTags: ["posts"],
        }),
        getMyPost: builder.query({
            query: () => ({
                url: "/post/my-post",
                method: "GET",
            }),
            providesTags: ["posts"],
        }),
        getAllPosts: builder.query({
            query: () => ({
                url: "/post",
                method: "GET",
            }),
            providesTags: ["posts"],
        }),
        createComment: builder.mutation({
            query: ({ postId, commentText }) => {
                return {
                    url: `/post/comments/${postId}`,
                    method: "POST",
                    body: commentText,
                };
            },
            invalidatesTags: ["posts"],
        }),
        updateComment: builder.mutation({
            query: ({ postId, commentId, commentText }) => {
                return {
                    url: `/post/update-comments/${postId}`,
                    method: "PATCH",
                    body: { commentText, commentId },
                };
            },
            invalidatesTags: ["posts"],
        }),
        votePost: builder.mutation({
            query: ({ postId }) => {
                return {
                    url: `/post/vote/${postId}`,
                    method: "PATCH",
                };
            },
            invalidatesTags: ["posts"],
        }),
        deleteComment: builder.mutation({
            query: ({ postId }) => {
                return {
                    url: `/post/delete/${postId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["posts"],
        }),
    }),
});

export const { 
    useCreateCommentMutation,
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetMyPostQuery,
    useUpdatePostMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,

} = postApi;