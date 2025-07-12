/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import user from "../../../assets/placeholders/user-placeholder.jpg";
import Spinner from "@/components/common/Spinner";
import { useAllUserQuery } from "@/redux/features/users/users.api";
import Link from "next/link";

const PastoreCard = () => {
  const { data, isFetching } = useAllUserQuery([
    { name: "limit", value: 12 },
    { name: "searchTerm", value: "PASTOR" },
  ]);

  console.log(data?.data?.data);
  const datas = data?.data?.data;

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {datas?.map((item: any) => (
        <Link
          href={`/pastors/${item.id}`}
          key={item?.id}
          className="border border-white/50 p-3 rounded-lg space-y-3"
        >
          <Image
            src={item?.profileImage || user}
            alt="user"
            width={300}
            height={200}
            className="w-full h-40 rounded-lg "
          />

          <p>{item.fullName}</p>
        </Link>
      ))}
    </div>
  );
};

export default PastoreCard;
