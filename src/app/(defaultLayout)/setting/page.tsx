import SettingTab from "@/components/modules/Setting/SettingTab";
import React from "react";

const SettingPage = () => {
  return (
    <div>
      <h1 className="md:text-5xl text-2xl font-medium md:mb-5 mb-3">
        My Profile
      </h1>
      <SettingTab />
    </div>
  );
};

export default SettingPage;
