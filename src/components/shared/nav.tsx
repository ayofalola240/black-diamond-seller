"use client";
import Image from "next/image";
import Link from "next/link";
import { NotificationBell, ShoppingCartComponent, StartAuction, UserComponent } from "./nav-components";
import { Routes } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white">
      <div className="py-3 border-b-[0.4px] border-[#EEEEEE]">
        <div className="flex max-w-container px-6 mx-auto w-full justify-end gap-8">
          <Link className={`font-weight ${pathname === Routes.Activities ? "opacity-50" : ""}`} aria-disabled={pathname === Routes.Activities} href={Routes.Activities}>
            Activity
          </Link>
          <Link className={`font-weight ${pathname === Routes.LeaderBoards ? "opacity-50" : ""}`} aria-disabled={pathname === Routes.LeaderBoards} href={Routes.LeaderBoards}>
            LeaderBoard
          </Link>
        </div>
      </div>
      <div className="flex flex-row py-5 max-w-container mx-auto px-6 justify-between">
        <Link href={Routes.Home}>
          <Image width={60} height={50} alt="Black Diamon's Logo" src="/svgs/logo.svg" />
        </Link>
        <div className="flex flex-row gap-4 items-center">
          <StartAuction />
          <NotificationBell />
          <ShoppingCartComponent />
          <UserComponent />
        </div>
      </div>
    </nav>
  );
};
