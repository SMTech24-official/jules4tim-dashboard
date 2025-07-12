/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import AddCategory from "./Modal/AddCategory";
import AddCourse from "./Modal/AddCourse";
import { useCategoryQuery } from "@/redux/features/dashboard/dashboard.api";
import { useAllVideoQuery } from "@/redux/features/content/content.api";
import Spinner from "@/components/common/Spinner";
import VideoCard from "../common/VideoCard";

const Content = () => {
  const [category, setCategory] = useState("");
  const { data } = useCategoryQuery(undefined);
  const { data: videos, isFetching } = useAllVideoQuery([
    { name: "limit", value: 9 },
    { name: "categoryId", value: category },
  ]);

  const categoryOptions = data?.data?.map((item: any) => {
    return {
      label: item.name,
      keyOption: item.id,
    };
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  if (isFetching) {
    return <Spinner />;
  }

  const allVideo = videos?.data?.data;

  return (
    <div className="space-y-8">
      <div className="flex justify-between gap-5">
        <div className="flex gap-1 items-center">
          <h3 className="text-2xl font-medium">Videos by category</h3>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="text-white bg-transparent px-2 py-1"
          >
            <option className="bg-secondary" value="">
              All
            </option>
            {categoryOptions?.map((item: any) => (
              <option
                key={item.keyOption}
                className="bg-secondary"
                value={item.keyOption}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-5">
          <AddCategory />
          <AddCourse />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        {allVideo?.map((item: any) => (
          <VideoCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Content;
