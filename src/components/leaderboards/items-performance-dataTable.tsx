"use client";

import { TAuctionPerformance } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DataTable } from "../shared";

export const ItemsPerformanceDataTable = ({ data }: { data: TAuctionPerformance }) => {
  const columns: ColumnDef<TAuctionPerformance["data"][0]>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => {
        return <p>#{row.original.rank}</p>;
      },
    },
    {
      accessorKey: "_id",
      header: () => <div className="text-left">Product Information</div>,
      cell: ({ row }) => {
        const realAuction = row.original.item;

        return (
          <div className="flex gap-2 min-w-[300px] sm:min-w-auto flex-row">
            <div className="relative overflow-hidden rounded-[8px] border-[#EEEEEE] w-[160px] h-[160px]">
              <Image src={(realAuction as any).image} alt={realAuction?.title} fill className="object-contain" />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <p className="font-medium line-clamp-1 text-ellipsis text-base sm:text-xl">{realAuction?.title}</p>
              <p className="text-[#666] text-sm">Starting Bid: ₦{realAuction.startingBidAmount.toLocaleString()}</p>
              <Link className="font-medium" href={`/${realAuction.slug}`}>
                View Product details
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "highestBid",
      header: () => <div className="text-left  min-w-fit">Highest Bids</div>,
      cell: ({ row }) => {
        return <p className="min-w-fit whitespace-nowrap">₦ {row.original.highestBid.toLocaleString()}</p>;
      },
    },
    {
      accessorKey: "totalBids",
      header: () => <div className="text-left min-w-fit">Total Bids</div>,
      cell: ({ row }) => {
        return <p>{row.original.totalBids}</p>;
      },
    },
    {
      accessorKey: "numberOfBidders",
      header: () => <div className="text-left  min-w-fit">Number of bidders</div>,
      cell: ({ row }) => {
        return <p>{row.original.numberOfBidders}</p>;
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.item.status;
        return (
          <div
            className={cn(
              "bg-input w-fit capitalize rounded-[6px] py-[2px] px-[6px] text-[12px] leading-[20px] -tracking-[0.3px]",
              "text-white",
              status == "completed" && "bg-[#2D5BFF] ",
              status == "ongoing" && "bg-orange-500",
              status == "cancelled" && "bg-[#FF0000] "
            )}
          >
            {status}
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data.data} />;
};
