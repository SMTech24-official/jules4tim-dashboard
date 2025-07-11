/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Spinner from "@/components/common/Spinner";
import { useCategoryQuery } from "@/redux/features/dashboard/dashboard.api";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import categoryIcon from "../../../assets/images/category.png";
import Image from "next/image";

const VideoCategory = () => {
  const { data, isFetching } = useCategoryQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  const category = data?.data;
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-6">Videos by Category</h2>

      <div className="">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {category.map((item: any) => (
            <SwiperSlide key={item.id} className="!w-[250px]">
              <div className="border border-white/50 p-4 rounded-lg space-y-6 bg-secondary">
                <Image
                  src={categoryIcon}
                  alt="category"
                  width={50}
                  height={50}
                />
                <h3 className="font-medium">{item.name}</h3>

                <div className="bg-white rounded-lg p-2 w-full text-black flex gap-2 justify-evenly text-sm">
                  <p>
                    Courses:{" "}
                    <span className="font-medium">{item?._count?.course}</span>
                  </p>
                  <p>|</p>
                  <p>
                    Videos:{" "}
                    <span className="font-medium">{item?._count?.course}</span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default VideoCategory;
