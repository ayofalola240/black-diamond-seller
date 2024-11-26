"use client";
import { IoRefresh } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const RefreshButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.refresh()}
      className='flex items-center rounded-[4px] h-10 gap-2'
      variant='outline'
    >
      <IoRefresh />
      <p className='font-medium'>Refresh</p>
    </Button>
  );
};
