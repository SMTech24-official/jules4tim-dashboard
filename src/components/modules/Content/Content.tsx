/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import AddCategory from "./Modal/AddCategory";
import AddCourse from "./Modal/AddCourse";
import { useCategoryQuery } from "@/redux/features/dashboard/dashboard.api";
import { useAllCourseQuery } from "@/redux/features/content/content.api";
import Spinner from "@/components/common/Spinner";
import CourseCard from "./CourseCard";
import AddCSVModal from "./Modal/AddCSVModal";
import Pagination from "@/components/common/Pagination";

const Content = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { data } = useCategoryQuery(undefined);
  const { data: course, isFetching } = useAllCourseQuery([
    { name: "limit", value: 12 },
    { name: "categoryId", value: category },
    { name: "page", value: String(currentPage) },
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

  const courses = course?.data?.result;
  const metaData = {
    limit: course?.data?.limit,
    page: course?.data?.page,
    skip: course?.data?.skip,
    total: course?.data?.total,
  };
  console.log(metaData);
  return (
    <div className="space-y-8">
      <div className="flex justify-between gap-5">
        <div className="flex gap-1 items-center">
          <h3 className="text-2xl font-medium">Courses by category</h3>
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
          <AddCategory type="create"/>
          <AddCourse />
          <AddCSVModal />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        {courses?.map((item: any) => (
          <CourseCard key={item.id} data={item} />
        ))}
      </div>

      {metaData?.total > 12 && (
        <Pagination
          currentPage={metaData?.page}
          totalItem={metaData?.total}
          limit={12}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default Content;
