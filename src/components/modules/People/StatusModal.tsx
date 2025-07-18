/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  usePastorStatusActionMutation,
  useUserStatusActionMutation,
} from "@/redux/features/users/users.api";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteModalProps {
  id: string;
  status: "ACTIVATE" | "DEACTIVATE";
  btnName?: string;
  actionFor?: "Pastor";
  btnType: "icon" | "btn";
}

const StatusModal = ({
  id,
  status,
  btnName,
  actionFor,
  btnType,
}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [updateStatus] = useUserStatusActionMutation();
  const [pastorStatus] = usePastorStatusActionMutation();

  const handleDelete = async () => {
    const toastId = toast.loading(`Updating...`);
    try {
      let res;
      if (status === "ACTIVATE" && !actionFor) {
        res = await updateStatus({
          id,
          data: { actions: "ACTIVATE" },
        }).unwrap();
      } else if (status === "DEACTIVATE" && !actionFor) {
        res = await updateStatus({
          id,
          data: { actions: "DEACTIVATE" },
        }).unwrap();
      } else if (status === "ACTIVATE" && actionFor === "Pastor") {
        res = await pastorStatus({
          id,
          data: { pastorStatus: "ACTIVATE" },
        }).unwrap();
      } else if (status === "DEACTIVATE" && actionFor === "Pastor") {
        res = await pastorStatus({
          id,
          data: { pastorStatus: "DEACTIVATE" },
        }).unwrap();
      }

      if (res.data) {
        toast.success("Status updated Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to update", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to update status`, {
        id: toastId,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {btnType === "btn" ? (
        <DialogTrigger className="bg-primary px-4 py-1 text-black rounded-full font-medium text-lg">
          {btnName}
        </DialogTrigger>
      ) : (
        <DialogTrigger className="bg-red-500 p-1 rounded-full">
          <CircleX />
        </DialogTrigger>
      )}

      <DialogContent className="max-w-[450px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col justify-center items-center gap-5 text-center">
              <h3 className="text-xl font-medium">
                Are you sure you want to proceed?
              </h3>
              <div className="flex md:gap-5 gap-3 font-normal">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-red-500 py-2 px-6 rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-primary py-2 px-6 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
