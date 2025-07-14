import baseApi from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    category: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    userChartData: builder.query({
      query: () => ({
        url: "/dashboard/subscribers-per-week",
        method: "GET",
      }),
    }),

    overView: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoryQuery,
  useUserChartDataQuery,
  useOverViewQuery
} = dashboardApi;
