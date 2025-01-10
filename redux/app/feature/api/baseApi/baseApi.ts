import { RootState } from "@/redux/app/store";
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  // baseUrl: "https://tech-backend-three.vercel.app/api/", 
  credentials: 'include',

  prepareHeaders: (headers, { getState}) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const BaseQueryToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    try {
      const result = await baseQuery(args, api, extraOptions);
console.log(result)
      if (result.error) {
        if (result.error.status === 401) {
          toast.error("Your session has expired. Please log in again.");
        } else if (result.error.status === 404) {
          toast.error("Respurce not found");
        }
      }

      return result;
    } catch (error) {
      toast.error("Network error or unexpected issue.");
    }
};


export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["posts", "users"],
  baseQuery: BaseQueryToken,
  endpoints: () => ({}),

});


