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

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
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
  useCreateCourseMutation,
  useUserChartDataQuery,
  useOverViewQuery
} = dashboardApi;
