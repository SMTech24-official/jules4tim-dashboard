/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Spinner from "@/components/common/Spinner";
import Image from "next/image";
import { useParams } from "next/navigation";
import user from "../../../assets/placeholders/image_placeholder.png";
import { Mail } from "lucide-react";
import {
  useAllVideoQuery,
  useCourseQuery,
} from "@/redux/features/content/content.api";
import VideoCard from "../common/VideoCard";
import AddVideo from "./Modal/AddVideo";

const SingleCourse = () => {
  const { id } = useParams();
  const { data, isFetching } = useCourseQuery(id);
  const { data: videos } = useAllVideoQuery([
    { name: "limit", value: 9 },
    { name: "courseId", value: id },
  ]);

  if (isFetching) {
    return <Spinner />;
  }

  const allVideo = videos?.data?.data;
  const courseData = data?.data;

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="my-6 border border-white/50 rounded-lg bg-secondary p-5">
      <div className="flex gap-3 justify-between items-center">
        <h2 className="text-xl font-medium">Details Overview</h2>
      </div>

      <div className="flex gap-6 justify-between items-end">
        <div className="mt-5 mb-8 flex gap-3">
          <Image
            src={courseData?.mentor?.user?.profileImage || user}
            alt="user"
            width={500}
            height={400}
            className="w-44 h-40 rounded-lg border border-primary"
          />

          <div className="space-y-3">
            <h3 className="text-lg">{courseData?.title}</h3>
            <h3 className="text-lg">{courseData?.mentor?.user?.fullName}</h3>

            <div className="flex items-center p-2 border border-white/50 rounded-lg gap-2">
              <Mail className="!w-6 !h-6" /> {courseData?.mentor?.user?.email}
            </div>
          </div>
        </div>

        <AddVideo userId={courseData?.mentor?.user?.id} />
      </div>

      <div className="border-b border-white/50 mb-6 pb-3">
        <h3 className="text-lg">Videos ({allVideo?.length})</h3>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {allVideo?.map((item: any) => (
          <VideoCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SingleCourse;
