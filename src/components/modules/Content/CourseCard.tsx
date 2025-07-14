/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

type VideoItem = {
  id: string | number;
  title: string;
  mentor: any;
  thumbnail: string;
  createdAt: string | Date;
};

type Props = {
  data: VideoItem;
};

const CourseCard = ({ data }: Props) => {
console.log(data);
  return (
    <Link href={`/content/${data?.id}`} className="space-y-4">
      <Image
        src={data.thumbnail}
        alt="thumbnail"
        width={500}
        height={250}
        className="w-full h-64 rounded-lg"
      />

      <div className="flex justify-between gap-2">
        <div className="space-y-1">
          <p>{data.title}</p>
          <p>Mentors - {data?.mentor?.user?.fullName}</p>
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
            <p>{data.title}</p>
            <p>{format(new Date(data.createdAt), "MMM d, yyyy")}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
