import { Loader } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="md:py-10 py-5 flex justify-center items-center">
      <div className="animate-spin">
        <Loader className="text-primary text-4xl w-8 h-8" />
      </div>
    </div>
  );
};

export default Spinner;
