import LoginForm from "@/components/modules/Auth/LoginForm";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto  h-screen flex justify-center items-center">
      <div className="w-full flex flex-col gap-12 items-center bg-[#19303B] md:p-28 p-16 rounded-lg border border-white/50">
        <Image src={logo} alt="EOL" height={200} width={200} />
        <h1 className="text-3xl text-primary font-medium text-center">
          {`Hey there, Super Admin! We're excited to have you back. Let's get you
          logged in!`}
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
