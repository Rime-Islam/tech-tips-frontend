import { baseApi } from "../baseApi/baseApi";



const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (data) => {
                return {
                    url: "/post/create",
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ["posts"],
        }),
        getMyPost: builder.mutation({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body,
            }),
        }),
        forgetPassword: builder.mutation({
            query: (body) => ({
                url: "/auth/forget_password",
                method: "POST",
                body,
            }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: "/auth/reset_password",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { 
    useForgetPasswordMutation,
    useLoginUserMutation,
    useRegisterUserMutation,
    useResetPasswordMutation
} = postApi;