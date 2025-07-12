"use client";
import Spinner from "@/components/common/Spinner";
import { useGetUserQuery } from "@/redux/features/users/users.api";
import Image from "next/image";
import { useParams } from "next/navigation";
import user from "../../../assets/placeholders/image_placeholder.png";
import { Mail } from "lucide-react";
import PastorTab from "./PastorTab";
import { format } from "date-fns";

const SinglePastor = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetUserQuery(id);

  const userData = data?.data;

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="my-6 border border-white/50 rounded-lg bg-secondary p-5">
      <h2 className="text-xl font-medium">Details Overview</h2>

      <div className="mt-5 mb-8 flex gap-3">
        <Image
          src={userData?.profileImage || user}
          alt="user"
          width={500}
          height={400}
          className="w-40 h-40 rounded-lg border border-primary"
        />

        <div className="space-y-3">
          <h3 className="text-lg">{userData?.fullName}</h3>

          <div className="flex items-center p-2 border border-white/50 rounded-lg gap-2">
            <Mail className="!w-6 !h-6" /> {userData?.email}
          </div>

          <h3 className="text-lg">
            Joining Date:{" "}
            {format(new Date(userData?.joiningDate), "MMM d, yyyy")}
          </h3>
        </div>
      </div>

      <PastorTab />
    </div>
  );
};

export default SinglePastor;
