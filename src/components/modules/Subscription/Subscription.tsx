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
import { useSubscriberQuery } from "@/redux/features/dashboard/dashboard.api";
import { format } from "date-fns";
import Image from "next/image";
import userIcon from "@/assets/placeholders/user-placeholder.jpg";

const Subscription = () => {
  const { data, isLoading } = useSubscriberQuery(undefined);

  const subscriber = data?.data?.result;
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div  className="bg-secondary p-6 rounded-2xl border border-white/50 mt-8">
      <h2 className="text-2xl font-semibold mb-8">Subscription Purchase List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base text-white font-medium">
              Subscriber Name
            </TableHead>
            <TableHead className="text-base text-white font-medium">
              Transaction Id
            </TableHead>
            <TableHead className="text-base text-white font-medium">
              Start Date
            </TableHead>
            <TableHead className="text-base text-white font-medium">
              End Date
            </TableHead>
            <TableHead className="text-base text-white font-medium">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriber?.map((item: any) => (
            <TableRow key={item.id} className="border-none text-base">
              <TableCell className="py-2 flex items-center gap-2">
                <Image
                  src={item?.user?.profileImage || userIcon}
                  alt={item?.user?.fullName}
                  width={60}
                  height={60}
                  className="h-12 w-12 rounded-full"
                />
                {item?.user?.fullName}
              </TableCell>
              <TableCell>{item?.transactionId}</TableCell>
              <TableCell>
                {format(new Date(item?.startDate), "dd-MM-yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(item?.endDate), "dd-MM-yyyy")}
              </TableCell>
              <TableCell
                className={
                  item?.status === "ACTIVE" ? "text-primary" : "text-yellow-500"
                }
              >
                {item?.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Subscription;
