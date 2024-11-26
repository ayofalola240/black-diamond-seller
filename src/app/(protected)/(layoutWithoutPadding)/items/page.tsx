"use client";

import { SharedItemComponent } from "@/components/shared";
import { auctionLimit } from "@/lib/utils";
import { initializeSocket } from "@/lib/socket";
import { useGetAuctions } from "@/hooks";
import { useEffect, useState } from "react";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: IProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || auctionLimit;
  const [status, setStatus] = useState("all"); // Dynamic status

  // Use the custom hook to fetch auctions
  const {
    isLoading,
    error,
    data: auctions,
    refetch,
  } = useGetAuctions({
    page,
    limit,
    status,
  });

  useEffect(() => {
    console.log("Initializing socket...");
    const socket = initializeSocket();

    const handleAuctionStart = (data: any) => {
      console.log("Auction started:", data);
      refetch(); // Refetch data when auction starts
      setStatus("all");
    };

    const handleAuctionComplete = (data: any) => {
      console.log("Auction completed:", data);
      refetch(); // Refetch data when auction completes
      setStatus("all");
    };

    socket.on("auctionStart", handleAuctionStart);
    socket.on("auctionComplete", handleAuctionComplete);

    return () => {
      console.log("Cleaning up socket...");
      socket.off("auctionStart", handleAuctionStart);
      socket.off("auctionComplete", handleAuctionComplete);
    };
  }, [refetch]); // Ensure `refetch` is in the dependency array

  return (
    <section className="py-[60px] px-6 gap-4 max-w-container mx-auto flex-col flex">
      <SharedItemComponent page={page} limit={limit} isLoading={isLoading} error={error} auctions={auctions} setStatus={setStatus} status={status} />
    </section>
  );
}
