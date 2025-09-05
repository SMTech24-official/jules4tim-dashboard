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
import Link from "next/link";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { FieldValues } from "react-hook-form";
import { ChevronDown, Search } from "lucide-react";
import StatusModal from "./StatusModal";
import Pagination from "@/components/common/Pagination";

const People = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState<string>("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = useAllUserQuery([
    { name: "limit", value: 15 },
    { name: "page", value: String(currentPage) },
    ...(category ? [{ name: "role", value: category }] : []),
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
  ]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setSearchTerm("");
  };

  const userOptions = ["MENTOR", "PASTOR"];

  const handleSubmit = (data: FieldValues) => {
    setSearchTerm(data.search);
  };

  const handleStatus = (id: string) => {
    if (userId === id) {
      setUserId("");
    } else {
      setUserId(id);
    }
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
          <div className="flex gap-1 items-center text-primary border-b border-primary text-xl space-x-3 pb-2">
            <h3>ALL</h3>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="bg-transparent px-2 py-1 text-primary"
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
            <h3>({users?.length})</h3>
          </div>

          <Link
            href={"/panding-pastor"}
            className={`${
              category !== "PASTOR" ? "hidden" : ""
            } border-b border-white/50 text-xl pb-2`}
          >
            <h3 className="text-[#f5938ab0] mt-1">Pending Pastor</h3>
          </Link>
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
              <TableCell>
                <div className="relative">
                  <div
                    onClick={() => handleStatus(user?.id)}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    {user?.actions} <ChevronDown />
                  </div>

                  <div
                    className={`${
                      userId !== user?.id ? "hidden" : ""
                    } absolute top-6 border border-white/50 p-5  flex gap-1 flex-col bg-[#001a26] rounded-sm z-30 space-y-3`}
                  >
                    <StatusModal
                      id={user?.id}
                      status="ACTIVATE"
                      btnName="Active"
                      btnType="btn"
                    />
                    <StatusModal
                      id={user?.id}
                      status="DEACTIVATE"
                      btnName="Deactivate"
                      btnType="btn"
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

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

export default People;
