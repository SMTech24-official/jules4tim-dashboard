/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Spinner from "@/components/common/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePandingPastorQuery } from "@/redux/features/users/users.api";
import Image from "next/image";
import { useState } from "react";
import userIcon from "../../../assets/placeholders/user-placeholder.jpg";
import Link from "next/link";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { FieldValues } from "react-hook-form";
import { Search } from "lucide-react";
import StatusModal from "./StatusModal";
import Pagination from "@/components/common/Pagination";

const PandingPasrot = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = usePandingPastorQuery([
    { name: "limit", value: 15 },
    { name: "page", value: String(currentPage) },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
  ]);

  const handleSubmit = (data: FieldValues) => {
    setSearchTerm(data.search);
  };

  if (isFetching) {
    return <Spinner />;
  }

  const users = data?.data?.data;
  const metaData = data?.data?.meta;

  return (
    <div>
      <div className="flex justify-between gap-4 flex-wrap mb-8">
        <div className="flex gap-7 items-center">
          <Link
            href={"/people"}
            className="border-b border-white/50 text-white/50 text-xl pb-2 mt-1"
          >
            <h3>ALL USERS</h3>
          </Link>

          <div className={`border-b border-[#f65142] text-xl pb-2`}>
            <h3 className="text-[#f65142] mt-1">Pending Pastor </h3>
          </div>
        </div>

        <div className="">
          <MyFormWrapper onSubmit={handleSubmit} className="flex items-start">
            <MyFormInput
              name="search"
              inputClassName="rounded-none"
              placeholder="Search..."
            />

            <button className="p-[13px] border border-white/70">
              <Search />
            </button>
          </MyFormWrapper>
        </div>
      </div>
      {users.length < 1 ? (
        <p className="text-center text-xl font-medium">No Data Found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="w-[100px] text-white">Users</TableHead>
              <TableHead className="text-white">User name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className=" text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {users?.map((user: any) => (
            <TableBody key={user.id}>
              <TableRow className="text-base">
                <TableCell className="font-medium">
                  <Image
                    src={user?.profileImage || userIcon}
                    alt="thumbnail"
                    width={500}
                    height={250}
                    className="w-10 h-10 rounded-full"
                  />
                </TableCell>
                <TableCell>{user?.fullName}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.status}</TableCell>
                <TableCell className="flex gap-3 items-center">
                  <StatusModal
                    id={user?.id}
                    status="ACTIVATE"
                    btnName="Activate"
                    actionFor="Pastor"
                    btnType="btn"
                  />
                  <StatusModal
                    id={user?.id}
                    status="ACTIVATE"
                    actionFor="Pastor"
                    btnType="icon"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      )}

      {metaData?.total > 15 && (
        <Pagination
          currentPage={metaData?.page}
          totalItem={metaData?.total}
          limit={15}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default PandingPasrot;
