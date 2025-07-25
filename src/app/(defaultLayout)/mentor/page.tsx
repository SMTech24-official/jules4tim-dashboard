import AddMentorModal from "@/components/modules/Mentor/AddMentorModal";
import MentorCard from "@/components/modules/Mentor/MentorCard";

const page = () => {
  return (
    <div className="my-6 bg-secondary p-6 rounded-lg">
      <div className="flex justify-between gap-3 items-center mb-6">
        <h2 className="md:text-2xl text-xl font-semibold">
          Leader & Mentor
        </h2>
        <AddMentorModal />
      </div>

      <MentorCard />
    </div>
  );
};

export default page;
