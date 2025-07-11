"use client";
import { useState } from "react";
import AddCategory from "./Modal/AddCategory";
import AddCourse from "./Modal/AddCourse";

const Content = () => {
  const [category, setCategory] = useState("All");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex justify-between gap-5">
      <div className="flex gap-1 items-center">
        <h3 className="text-2xl font-medium">Videos by category</h3>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="text-white bg-transparent px-2 py-1"
        >
          <option className="bg-secondary" value="All">All</option>
          <option className="bg-secondary" value="Drama">Drama</option>
          <option className="bg-secondary" value="Story">Story</option>
        </select>
      </div>


    <div className="flex gap-5">
        <AddCategory />
        <AddCourse />
    </div>
    </div>
  );
};

export default Content;
