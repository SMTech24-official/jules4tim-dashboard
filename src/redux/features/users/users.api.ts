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

    userStatusAction: builder.mutation({
      query: (args) => ({
        url: `/users/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["User"],
    }),

    pandingPastor: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users/pending-pastors",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Pastor"],
    }),

    pastorStatusAction: builder.mutation({
      query: (args) => ({
        url: `/users/pastor-status/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Pastor"],
    }),

    analysisChart: builder.query({
      query: (id) => ({
        url: `/dashboard/video-uploaded-per-month/${id}`,
        method: "GET",
      }),
    }),

    addMentor: builder.mutation({
      query: (data) => ({
        url: `/users/register/mentor-and-admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAllUserQuery,
  useGetUserQuery,
  useUserStatusActionMutation,
  useAnalysisChartQuery,
  useAddMentorMutation,
  usePandingPastorQuery,
  usePastorStatusActionMutation
} = usersdApi;
