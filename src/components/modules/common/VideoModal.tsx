"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useMemo } from "react";
import { format } from "date-fns";


type VideoItem = {
  id: string | number;
  title: string;
  mentorName: string;
  thumbnail: string;
  courseName: string;
  introVideo: string;
  videoUrl: string;
  mentorProfileImage: string;
  outroVideo: string;
  createdAt: string | Date;
};

type Props = {
  data: VideoItem;
};

const VideoModal = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const videoQueue = useMemo(
    () =>
      [data.introVideo, data.videoUrl, data.outroVideo].filter(
        (src) => typeof src === "string" && src.trim() !== ""
      ),
    [data]
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleVideoEnd = () => {
    if (currentIndex < videoQueue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleModalChange = (state: boolean) => {
    setOpen(state);
    if (!state) {
      setCurrentIndex(0);
    }
  };

  const currentSrc = videoQueue[currentIndex];

  return (
    <div>
      <Dialog open={open} onOpenChange={handleModalChange}>
        <DialogTrigger className="w-full">
          <div className="space-y-2">
            <Image
              src={data.thumbnail}
              alt="thumbnail"
              width={500}
              height={250}
              className="w-full h-56 rounded-lg"
            />
            <div className="text-start px-2">
              <p className="line-clamp-1 mb-2">{data?.courseName}</p>
              <p className="line-clamp-1 text-sm">{data.title}</p>
              <div className="flex justify-between">
                <p className="text-sm">Mentors - {data?.mentorName}</p>
                <p className="bg-black/20 px-2 rounded-sm text-sm">
                  {format(new Date(data.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-secondary text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{data.title}</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="w-full h-auto max-w-3xl mx-auto">
              {currentSrc ? (
                <video
                  key={currentSrc}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  src={currentSrc}
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                  playsInline
                />
              ) : (
                <p className="text-red-400">No valid video to play.</p>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoModal;
