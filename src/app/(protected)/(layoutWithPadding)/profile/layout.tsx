"use client";

import { AccountSvg, AuctionSvg, NotificationSvg, PasswordSvg, PaymentSvg } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { cn, Routes } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SquareMenu } from "lucide-react";
import { useCallback, useState } from "react";
import { useGetUser, useWindowDimensions } from "@/hooks";
import { MdLogout } from "react-icons/md";
import { Loading } from "@/components/shared";
import NotFound from "@/app/not-found";
import { UserProvider } from "@/components/profile/user-context";
import { useQueryClient } from "@tanstack/react-query";
import { createAxiosClient } from "@/lib/api";

const sidebarItems = [
  {
    label: "Account Information",
    url: Routes.AccountInformation,
    icon: AccountSvg,
  },
  {
    label: "Auction Information",
    url: Routes.AuctionInformation,
    icon: AuctionSvg,
  },
  {
    label: "Payment Information",
    url: Routes.PaymentInformation,
    icon: PaymentSvg,
  },
  {
    label: "Password",
    url: Routes.Password,
    icon: PasswordSvg,
  },
  {
    label: "Notification Settings",
    url: Routes.NotificationSettings,
    icon: NotificationSvg,
  },
  {
    label: "Logout",
    url: "",
    icon: MdLogout,
  },
] as const;

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { width: innerWidth } = useWindowDimensions();
  const { data, error, isLoading } = useGetUser();
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      const client = createAxiosClient();
      const response = await client.post("/auth/signout");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data?.errors) {
        const errorMessage = error.response.data.errors[0]?.message || "An error occurred during logout.";
        throw new Error(errorMessage);
      }
      throw new Error(error.message || "An unexpected error occurred during logout.");
    }
  };

  const SideBar = useCallback(() => {
    const handleLogout = async () => {
      try {
        await logout();
        queryClient.clear();
        router.push(Routes.Home);
        router.refresh();
      } catch (error: any) {
        console.error(error.message);
      }
    };
    return (
      <>
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              onClick={() => {
                setIsPopOverOpen(false);
                if (item.label === "Logout") {
                  handleLogout();
                  return;
                }
                router.push(item.url);
              }}
              className={cn(
                "font-medium h-10 text-base hover:text-white text-left w-full border border-[#eee] gap-2 flex flex-row justify-start",
                pathname.includes(item.url) ? "text-white border-0" : "text-black sm:text-white bg-transparent",
                item.label === "Logout" && "!text-red-500"
              )}
              key={item.label}
            >
              <IconComponent />
              {item.label}
            </Button>
          );
        })}
      </>
    );
  }, [pathname, router, queryClient]);

  return (
    <section className="flex flex-col text-white py-[30px] sm:py-[60px] gap-10 max-w-container mx-auto">
      <header className="sm:pb-[20px] sm:border-b border-[#EEEEEE]">
        <h2 className="hidden sm:block">Profile</h2>
        <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
          <PopoverTrigger className="flex border gap-2 p-2 w-full rounded-md sm:hidden flex-row items-center">
            <SquareMenu size={20} />
            Your Profile
          </PopoverTrigger>
          <PopoverContent style={{ width: innerWidth - 32 }} className="flex flex-col shadow-2xl min-w-full">
            <SideBar />
          </PopoverContent>
        </Popover>
      </header>
      <section className="gap-x-10 flex flex-row">
        <aside className="hidden w-full sticky top-0 h-full max-w-[240px] lg:max-w-[270px] sm:flex flex-col gap-1">
          <SideBar />
        </aside>
        <div className="sm:-mt-2 sm:pb-[100px] w-full">{isLoading ? <Loading /> : error ? <NotFound /> : <UserProvider value={data!}>{children}</UserProvider>}</div>
      </section>
    </section>
  );
}
