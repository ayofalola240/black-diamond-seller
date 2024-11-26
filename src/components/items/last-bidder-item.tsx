"use client";

import { getRelativeTime } from "@/lib/utils";
import { useEffect } from "react";

interface IProps {
  bidDate: Date;
  name: string;
  index: number;
  amount: number;
}

export const LastBidders = ({ bidDate, name, amount, index }: IProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const relativeTime = getRelativeTime(bidDate);
      document.getElementById(`last-bid-time-ago-${index}`)!.textContent = relativeTime;
    }, 1000);

    return () => clearInterval(interval);
  }, [bidDate, index]);

  return (
    <li className="flex-row flex items-center  justify-between py-4">
      <p id={`last-bid-time-ago-${index}`} className="text-[#666666] items-center w-full">
        {getRelativeTime(new Date())}
      </p>
      <p className="font-medium truncate items-center w-full">{name}</p>
      <p className="text-[#666666] w-full items-center">₦{amount.toLocaleString()}</p>
    </li>
  );
};
