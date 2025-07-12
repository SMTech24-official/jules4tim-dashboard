import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/globalType";

export const usersdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    analysisChart: builder.query({
      query: (id) => ({
        url: `/dashboard/video-uploaded-per-month/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllUserQuery, useGetUserQuery, useAnalysisChartQuery } = usersdApi;
