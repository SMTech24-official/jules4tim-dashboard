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
import { useCreateCategoryMutation } from "@/redux/features/dashboard/dashboard.api";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [addCategory] = useCreateCategoryMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading...");

    try {
      await addCategory(data).unwrap();
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
          <CircleFadingPlus className="w-5 h-5 text-primary" /> Add Category
        </DialogTrigger>
        <DialogContent className="bg-secondary text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Category</DialogTitle>
            <DialogDescription></DialogDescription>
            <div>
              <MyFormWrapper onSubmit={handleSubmit} className="space-y-3">
                <MyFormInput
                  name="name"
                  label="Category Name"
                  placeholder="Enter category name"
                />

                <MyBtn name="Create" width="w-full" />
              </MyFormWrapper>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
