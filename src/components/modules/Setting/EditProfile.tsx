/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import userImg from "../../../assets/placeholders/user-placeholder.jpg";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
import Spinner from "@/components/common/Spinner";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import MyBtn from "@/components/common/MyBtn";

const EditProfile = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const userData = data?.data;

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");

    const formData = new FormData();

    if (data.image) {
      formData.append("image", data.image);
    }

    formData.append(
      "data",
      JSON.stringify({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
      })
    );

    try {
      await updateUser(formData).unwrap();

      toast.success("Updated successfully", { id: toastId });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Update", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex w-full justify-center items-center py-5">
      <div className="md:w-2/3 bg-secondary md:p-12 p-5 md:rounded-3xl rounded-2xl border-[3px] border-white md:space-y-7 space-y-4">
        <MyFormWrapper
          onSubmit={onSubmit}
          defaultValues={{
            fullName: userData?.fullName,
            phoneNumber: userData?.phoneNumber,
            address: userData?.address,
          }}
        >
          <p className="mb-3">Your Image</p>
          <div className="max-w-80 grid grid-cols-2 gap-6 mb-6">
            <Image
              src={userData?.profileImage || userImg}
              alt="user"
              width={1000}
              height={1000}
              className="w-[130px] h-[130px] rounded-lg"
            />
            <MyFormInput
              type="file"
              acceptType="image/*"
              name="image"
              filePlaceholder="Upload Image (600 x 600)"
              required={false}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <MyFormInput
              name="fullName"
              label="Your Name"
              placeholder="Name..."
              required={false}
            />
            <MyFormInput
              name="phoneNumber"
              label="Your PhoneNumber"
              placeholder="0123456..."
              required={false}
            />
          </div>

          <MyFormInput
            name="address"
            label="Your Address"
            placeholder="Address..."
            required={false}
          />

          <MyBtn name="Submit" width="w-full" />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default EditProfile;
