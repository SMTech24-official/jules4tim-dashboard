import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insightify",
  description: "Transform Voice, Images, and Videos into Text",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="pl-32 pr-6 pb-16">
      <SideBar />
      <main className="w-full">
        <div className="max-w-[1372px] mx-auto md:py-5 md:px-0 px-3 bg-[#001a26] text-white">
          <Header />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CommonLayout;
