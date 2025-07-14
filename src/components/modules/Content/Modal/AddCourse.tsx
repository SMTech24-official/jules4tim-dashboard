/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormSelect from "@/components/form/MyFormSelect";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateCourseMutation } from "@/redux/features/content/content.api";
import { useCategoryQuery } from "@/redux/features/dashboard/dashboard.api";
import { useAllUserQuery } from "@/redux/features/users/users.api";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [addCourse] = useCreateCourseMutation();
  const { data } = useCategoryQuery(undefined);

  const { data: mentors } = useAllUserQuery([
    { name: "limit", value: 9999 },
    { name: "searchTerm", value: "MENTOR" },
  ]);

  const mentorDatas = mentors?.data?.data;

  const mentorOptions = mentorDatas?.map((item: any) => {
    return {
      label: item.fullName,
      keyOption: item.id,
      value: item.id,
    };
  });

  const categoryOptions = data?.data?.map((item: any) => {
    return {
      label: item.name,
      keyOption: item.id,
      value: item.id,
    };
  });

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading...");

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        categoryId: data.categoryId,
        userId: data.userId,
      })
    );

    formData.append("intro", data.video);
    formData.append("thumbnail", data.thumbnail);

    try {
      await addCourse(formData).unwrap();
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
          <CircleFadingPlus className="w-5 h-5 text-primary" /> Add Course
        </DialogTrigger>
        <DialogContent className="bg-secondary text-white h-5/6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Category</DialogTitle>
            <DialogDescription></DialogDescription>
            <div>
              <MyFormWrapper onSubmit={handleSubmit} className="space-y-3">
                <MyFormInput
                  name="title"
                  label="Course Name"
                  placeholder="Enter category name"
                />
                <MyFormSelect
                  name="categoryId"
                  label="Choose Category"
                  options={categoryOptions}
                />
                <MyFormSelect
                  name="userId"
                  label="Choose Mentor"
                  options={mentorOptions}
                />
                <MyFormInput
                  name="thumbnail"
                  type="file"
                  label="Upload Course Thumnail"
                  filePlaceholder="Upload Thumnaiul"
                  acceptType="image/*"
                />
                <MyFormInput
                  type="file"
                  name="video"
                  label="Upload Course intro video"
                  filePlaceholder="Upload Video"
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

export default AddCourse;
