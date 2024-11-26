"use client";

import { Bid, TBidDataTable } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableTime } from "../shared";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

export const BidTable = ({ auction, bids, isUseInAllBids = false }: TBidDataTable) => {
  const columns: ColumnDef<Bid>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: (row) => {
        const realAuction = isUseInAllBids ? row.cell.row.original.auction : auction;

        const status = realAuction.status;
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
    {
      accessorKey: "_id",
      header: () => <div className="text-left">Product Information</div>,
      cell: (row) => {
        const realAuction = isUseInAllBids ? row.cell.row.original.auction : auction;

        return (
          <div className="flex gap-2 min-w-[300px] sm:min-w-auto flex-row">
            <div className="relative overflow-hidden rounded-[8px] border-[#EEEEEE] w-[160px] h-[160px]">
              <Image src={realAuction?.images[0]?.image_url} alt={realAuction?.title} fill className="object-contain" />
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
      accessorFn: (row) => row.amount,
      header: "Amount",
      cell: ({ row }) => {
        return <p className="font-medium">₦{row.original.amount.toLocaleString()}</p>;
      },
    },
    {
      accessorFn: (row) => row.bidder.firstName,
      header: "Bidder Alias",
      cell: ({ row }) => {
        const bidderRow = row.original.bidder;

        return (
          <div className="flex items-center min-w-[150px] gap-2 flex-row">
            <Avatar>
              <AvatarImage src={""} alt={`${bidderRow.firstName} Image`} />
              <AvatarFallback>
                {bidderRow.firstName?.charAt(0)}
                {bidderRow.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className="line-clamp-1 text-ellipsis">
              {bidderRow.firstName} {bidderRow.lastName}
            </p>
          </div>
        );
      },
    },
    {
      accessorFn: (row) => row.timestamp,
      header: "Date and ETA",
      cell: ({ row }) => <DataTableTime date={new Date(row.original.timestamp)} index={row.index} />,
    },
  ];
  return <DataTable columns={columns} data={bids} />;
};
