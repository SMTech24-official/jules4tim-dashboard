/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import user from "../../../assets/placeholders/user-placeholder.jpg";
import Spinner from "@/components/common/Spinner";
import { useAllUserQuery } from "@/redux/features/users/users.api";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

const MentorCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useAllUserQuery([
    { name: "limit", value: 16 },
    { name: "page", value: String(currentPage) },
    { name: "searchTerm", value: "MENTOR" },
  ]);

  const datas = data?.data?.data;

  if (isFetching) {
    return <Spinner />;
  }

  const metaData = data?.data?.meta;
  return (
    <div className="space-y-7">
      <div className="grid md:grid-cols-4 gap-6">
        {datas?.map((item: any) => (
          <Link
            href={`/mentor/${item.id}`}
            key={item?.id}
            className="border border-white/50 p-3 rounded-lg space-y-3"
          >
            <Image
              src={item?.profileImage || user}
              alt="user"
              width={300}
              height={200}
              className="w-full h-48 rounded-lg "
            />

            <p>{item.fullName}</p>
          </Link>
        ))}
      </div>

      {metaData?.total > 16 && (
        <Pagination
          currentPage={metaData?.page}
          totalItem={metaData?.total}
          limit={16}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default MentorCard;
