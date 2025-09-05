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
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/dashboard/dashboard.api";
import { CircleFadingPlus, SquarePen } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddCategory = ({
  type,
  id,
  name,
}: {
  type: "edit" | "create";
  id?: string;
  name?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [addCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading...");

    try {
      if (type === "create") {
        await addCategory(data).unwrap();
      } else {
        await updateCategory({ id, data }).unwrap();
      }
      toast.success("Uploaded successfully", { id: toastId });
      setOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Upload", { id: toastId });
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {type === "create" ? (
          <DialogTrigger className="border border-white/50 rounded-lg px-4 py-3 flex gap-2 items-center">
            <CircleFadingPlus className="w-5 h-5 text-primary" /> Add Category
          </DialogTrigger>
        ) : (
          <DialogTrigger>
            <SquarePen className="text-primary" />
          </DialogTrigger>
        )}
        <DialogContent className="bg-secondary text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {" "}
              {type === "create" ? "Create New" : "Edit"} Category
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <div>
              <MyFormWrapper
                onSubmit={handleSubmit}
                defaultValues={{ name }}
                className="space-y-3"
              >
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
