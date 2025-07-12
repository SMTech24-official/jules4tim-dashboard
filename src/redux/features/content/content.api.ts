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
  }),
});

export const {useAllVideoQuery} = videoApi;
