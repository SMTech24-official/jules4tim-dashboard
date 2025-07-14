/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartTab from "./TabItems/ChartTab";
import { useAllVideoQuery } from "@/redux/features/content/content.api";
import Spinner from "@/components/common/Spinner";
import VideoCard from "../common/VideoCard";

const MentorTab = () => {
  const { data: videos, isFetching } = useAllVideoQuery([
    { name: "limit", value: 9 },
  ]);

  if (isFetching) {
    return <Spinner />;
  }

  const allVideo = videos?.data?.data;
  return (
    <div>
      <Tabs defaultValue="Overall Analysis" className="w-full">
        <TabsList className="bg-transparent mb-6">
          <TabsTrigger
            value="Overall Analysis"
            className="text-base font-normal text-gray-500 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Overall Analysis
          </TabsTrigger>
          <TabsTrigger
            value="Upload Video"
            className="text-base font-normal text-gray-500 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Upload Video
          </TabsTrigger>
          <TabsTrigger
            value="Live Video"
            className="text-base font-normal text-gray-500 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Live Video
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Overall Analysis">
          <h3 className="text-xl mb-9">Video Upload Per Month</h3>
          <ChartTab />
        </TabsContent>
        <TabsContent value="Upload Video">
          <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
            {allVideo?.map((item: any) => (
              <VideoCard key={item.id} data={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Live Video">
          Change your password here. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Doloremque, explicabo in amet odio, ducimus sit illo
          nesciunt quam neque quaerat porro. Obcaecati accusamus temporibus
          delectus distinctio ea eligendi laborum nobis?
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorTab;
