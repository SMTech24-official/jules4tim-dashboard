"use client";
import logo from "../../assets/placeholders/user-placeholder.jpg";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex justify-between gap-5 pb-12 border-b border-white/50">
      <div className="">
        <h1 className="text-2xl font-semibold text-primary">
          Hi Jules, how are you
        </h1>
        <p className="text-white/50">Lets learn something new today</p>
      </div>

      <div className="flex gap-5 items-center">
        <Image
          src={logo}
          height={120}
          width={300}
          alt="logo"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
