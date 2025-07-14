import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/globalType";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allVideo: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/video",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Video"],
    }),

    createVideo: builder.mutation({
      query: (data) => ({
        url: "/video",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Video"],
    }),

    allCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/course/all",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Course"],
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    course: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllVideoQuery,
  useAllCourseQuery,
  useCourseQuery,
  useCreateVideoMutation,
  useCreateCourseMutation
} = videoApi;
