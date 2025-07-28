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
import { useUploadCSVMutation } from "@/redux/features/content/content.api";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddCSVModal = () => {
  const [open, setOpen] = useState(false);
  const [uploadCSV] = useUploadCSVMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading...");

    const formData = new FormData();

    formData.append("csvFile", data.csv);

    try {
      await uploadCSV(formData).unwrap();
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
          <CircleFadingPlus className="w-5 h-5 text-primary" /> Upload CSV
        </DialogTrigger>
        <DialogContent className="bg-secondary text-white overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">
              Upload your CSV file
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="pt-6">
              <MyFormWrapper onSubmit={handleSubmit} className="space-y-3">
                <MyFormInput
                  type="file"
                  name="csv"
                  label="CSV File"
                  filePlaceholder="Upload CSV"
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

export default AddCSVModal;
