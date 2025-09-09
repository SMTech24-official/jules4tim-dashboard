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

    updateCategory: builder.mutation({
      query: (args) => ({
        url: `/category/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Category"],
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

    apiList: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["Api"],
    }),

    createApi: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Api"],
    }),

    subscriber: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoryQuery,
  useUpdateCategoryMutation,
  useUserChartDataQuery,
  useOverViewQuery,
  useApiListQuery,
  useCreateApiMutation,
  useSubscriberQuery,
} = dashboardApi;
