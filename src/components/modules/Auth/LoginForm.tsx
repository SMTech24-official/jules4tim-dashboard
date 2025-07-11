/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/cookies";
import { varifyToken } from "@/utils/verifyToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login...");

    try {
      const res = await login(data).unwrap();
      const user = varifyToken(res.data.token) as TUser;

      if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN") {
        return toast.error("Unauthorize Access", { id: toastId });
      } else {
        setCookie(res.data.token);
        dispatch(setUser({ user, token: res.data.token }));

        toast.success("Login success", { id: toastId });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to login", { id: toastId });
    }
  };
  return (
    <MyFormWrapper onSubmit={onSubmit} className="w-full space-y-6">
      <MyFormInput
        type="email"
        name="email"
        inputClassName="md:py-6 py-2 md:px-5 px-5 rounded-lg bg-transparent !border !border-white/50 text-white"
        placeholder="email"
      />

      <MyFormInput
        type="password"
        name="password"
        inputClassName="md:py-6 py-2 md:px-5 px-5 rounded-lg bg-transparent !border !border-white/50 text-white"
        placeholder="password"
      />

      <div className="flex justify-end text-white">
        <Link href={"/"}>Forgot Password</Link>
      </div>

      <button className="bg-white rounded-lg py-5 md:px-36 px-20 text-2xl font-medium w-full">
        Login
      </button>
    </MyFormWrapper>
  );
};

export default LoginForm;
