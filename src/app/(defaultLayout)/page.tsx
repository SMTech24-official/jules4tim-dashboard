import OverView from "@/components/modules/Dashboard/OverView";
import VideoCategory from "@/components/modules/Dashboard/VideoCategory";

const CommonLayoutHomePage = () => {
  return (
    <div>
      <VideoCategory />

      <OverView />
    </div>
  );
};

export default CommonLayoutHomePage;
