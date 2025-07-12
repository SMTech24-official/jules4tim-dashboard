"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "../../assets/images/logo.png";
import {
  Settings,
  ClipboardMinus,
  LayoutDashboardIcon,
  LogOut,
  NotepadText,
  Users,
  ChartNoAxesColumnDecreasing,
  MessageCircleMore,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { removeCookie } from "@/utils/cookies";
import { RiUserCommunityLine } from "react-icons/ri";
import { MdOutlineSubscriptions } from "react-icons/md";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Content",
    url: "/content",
    icon: ClipboardMinus,
  },
  {
    title: "Leaders/pastors",
    url: "/pastors",
    icon: NotepadText,
  },
  {
    title: "People",
    url: "/remove",
    icon: Users,
  },
  {
    title: "Community",
    url: "/user",
    icon: RiUserCommunityLine,
  },
  {
    title: "Analytics",
    url: "/remove",
    icon: ChartNoAxesColumnDecreasing,
  },
  {
    title: "Message For Mentor",
    url: "/remove",
    icon: MessageCircleMore,
  },
  {
    title: "Subscription",
    url: "/remove",
    icon: MdOutlineSubscriptions,
  },
  {
    title: "Setting",
    url: "/setting",
    icon: Settings,
  },
];

const SideBar = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLolgout = () => {
    dispatch(logout());
    removeCookie("token");
    router.push("/login");
  };
  
  return (
    <Sidebar className="m-6 rounded-lg border border-white/50 overflow-hidden w-80">
      <SidebarContent className="!bg-secondary text-white">
        <SidebarGroup />
        <SidebarGroupLabel className="mb-14 mt-8 mx-auto">
          <Image src={logo} alt="logo" width={140} height={50} />
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="hover:border-primary hover:rounded-none hover:bg-none">
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className="hover:border-x-2">
                <SidebarMenuButton
                  asChild
                  className={`text-lg !font-normal text-white/70 px-5 w-full py-7 ${
                    pathName === `${item.url}`
                      ? "text-primary border-x-2 border-primary rounded-none"
                      : ""
                  }`}
                >
                  <a href={item.url}>
                    <item.icon className="!w-5 !h-5 mr-2" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="!bg-secondary text-white pb-20 border-t border-white/50">
        <button
          onClick={handleLolgout}
          className="py-3 rounded-lg text-base flex gap-2 items-center justify-center text-white/70"
        >
          <LogOut /> Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
