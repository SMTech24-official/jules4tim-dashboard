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
import { useApiListQuery } from "@/redux/features/dashboard/dashboard.api";
import AddApiModal from "./AddApiModal";

const ApiList = () => {
  const { data, isFetching } = useApiListQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="bg-secondary p-6 rounded-xl space-y-6">
      <div className="flex justify-between gap-5">
        <h2 className="text-xl">Api List</h2>

        <AddApiModal />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="text-base ">
            <TableHead className="w-[100px] text-white">No</TableHead>
            <TableHead className="text-white">API Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Type</TableHead>
            <TableHead className="text-white text-right">Satatus</TableHead>
          </TableRow>
        </TableHeader>
        {data?.data?.map((item: any, idx: number) => (
          <TableBody key={item?.id}>
            <TableRow>
              <TableCell className="">{idx + 1}</TableCell>
              <TableCell>{item?.apiName}</TableCell>
              <TableCell>{item?.createdAt}</TableCell>
              <TableCell>{item?.type}</TableCell>
              <TableCell className="text-right">{item?.status}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default ApiList;
