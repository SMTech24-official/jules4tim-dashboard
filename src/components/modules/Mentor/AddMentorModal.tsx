/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddMentorMutation } from "@/redux/features/users/users.api";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddMentorModal = () => {
  const [open, setOpen] = useState(false);
  const [addMentor] = useAddMentorMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading...");
    try {
      await addMentor({ ...data, role: "MENTOR" }).unwrap();
      toast.success("Uploaded successfully", { id: toastId });
      setOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Upload", { id: toastId });
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="border border-white/50 rounded-lg px-4 py-3 flex gap-2 items-center">
          <CircleFadingPlus className="w-5 h-5 text-primary" /> Add Mentor
        </DialogTrigger>
        <DialogContent className="bg-secondary text-white md:h-auto h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Mentor</DialogTitle>
            <DialogDescription></DialogDescription>
            <div>
              <MyFormWrapper onSubmit={handleSubmit} className="space-y-3">
                <MyFormInput
                  name="fullName"
                  label="Mentor Name"
                  placeholder="Enter name"
                />
                <MyFormInput
                  name="email"
                  label="Mentor Email"
                  placeholder="Enter email"
                />
                <MyFormInput
                  name="password"
                  type="password"
                  label="Mentor Password"
                  placeholder="Enter password"
                />
                <MyBtn name="Submit" width="w-full" />
              </MyFormWrapper>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMentorModal;
