"use client"
import Image from "next/image";
import React from "react";
// import { format } from "date-fns";

type VideoItem = {
  id: string | number;
  title: string;
  mentorName: string;
  thumbnail: string;
  createdAt: string | Date;
};

type Props = {
  data: VideoItem;
};

const VideoCard = ({ data }: Props) => {

  return (
    <div className="space-y-4">
      <Image
        src={data.thumbnail}
        alt="thumbnail"
        width={500}
        height={250}
        className="w-full h-56 rounded-lg"
      />

      {/* <div className="flex justify-between gap-2">
        <div className="space-y-1">
          <p>{data.title}</p>
          <p>Mentors - {data.mentorName}</p>
        </div>

        <div className="flex gap-1 items-center">
          <Image
            src={data.thumbnail}
            alt="thumbnail"
            width={500}
            height={250}
            className="w-8 h-8 rounded-full"
          />

          <div className="space-y-1 text-sm">
            <p>{data?.title}</p>
            <p>{format(new Date(data?.createdAt), "MMM d, yyyy")}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default VideoCard;
