"use client";

import { TBiddersPerformance } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badges, getInitials } from "@/lib/utils";
import { DataTable } from "../shared";
import Image from "next/image";
import { useGetUser } from "@/hooks";

export const ClientBiddersDataTable = ({
  data,
}: {
  data: TBiddersPerformance;
}) => {
  const { data: userData } = useGetUser();
  const columns: ColumnDef<TBiddersPerformance["data"][0]>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => {
        return <p>#{row.original.rank}</p>;
      },
    },
    {
      accessorKey: "bidderAlias",
      header: () => <div className="text-left">Bidder Alias</div>,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex items-center py-[30px] min-w-[150px] gap-2 flex-row">
            <Avatar>
              <AvatarImage src={item.image} alt={`${item.bidderAlias} Image`} />
              <AvatarFallback>{getInitials(item.bidderAlias)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="line-clamp-1 text-ellipsis">{item.bidderAlias}</p>
              {item.bidderAlias ==
                userData?.firstName + " " + userData?.lastName && (
                <p className="text-[12px] text-[#999999]">(You)</p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "totalBidsMade",
      header: () => <div className="text-left  min-w-fit">Total Bids Made</div>,
      cell: ({ row }) => {
        return <p>{row.original.totalBidsMade}</p>;
      },
    },
    {
      accessorKey: "totalBidsWon",
      header: () => <div className="text-left  min-w-fit">Total Bids Won</div>,
      cell: ({ row }) => {
        return <p>{row.original.totalBidsWon}</p>;
      },
    },
    {
      accessorKey: "badgesEarned",
      header: () => <div className="text-left min-w-fit">Badges Won</div>,
      cell: ({ row }) => {
        return (
          <ul className="flex flex-row gap-2 ">
            {row.original.badgesEarned.map((badge) => (
              <li
                key={badge}
                className="flex relative min-w-[24px] min-h-[24px] flex-row gap-1"
              >
                <Image alt={`${badge} bidder Icon`} src={Badges[badge]} fill />
              </li>
            ))}
          </ul>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data.data} />;
};
