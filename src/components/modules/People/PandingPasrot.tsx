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
import { useAllUserQuery } from "@/redux/features/users/users.api";
import Image from "next/image";
import { useState } from "react";
import userIcon from "../../../assets/placeholders/user-placeholder.jpg";

const PandingPasrot = () => {
  const [category, setCategory] = useState("");
  const { data, isFetching } = useAllUserQuery([
    { name: "limit", value: 15 },
    { name: "searchTerm", value: category },
  ]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const userOptions = ["MENTOR", "PASTOR"];

  if (isFetching) {
    return <Spinner />;
  }

  const users = data?.data?.data;

  return (
    <div>
      <div className="flex justify-between gap-4 flex-wrap mb-8">
        <div className="flex gap-1 items-center">
          <h3>ALL</h3>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="text-white bg-transparent px-2 py-1"
          >
            <option className="bg-secondary" value="">
              USERS
            </option>
            {userOptions?.map((item: any) => (
              <option key={item} className="bg-secondary" value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="text-base ">
            <TableHead className="w-[100px] text-white">Users</TableHead>
            <TableHead className="text-white">User name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className=" text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {users?.map((user: any) => (
          <TableBody key={user.id}>
            <TableRow>
              <TableCell className="font-medium">
                <Image
                  src={user?.profileImage || userIcon}
                  alt="thumbnail"
                  width={500}
                  height={250}
                  className="w-8 h-8 rounded-full"
                />
              </TableCell>
              <TableCell>{user?.fullName}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.status}</TableCell>
              <TableCell>{user?.actions}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default PandingPasrot;
