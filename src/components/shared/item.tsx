"use client";

import { cacheTags, cn, formatError, Routes } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { EllipsisVertical, IdCard, X } from "lucide-react";
import { FaLock } from "react-icons/fa";
import Image from "next/image";
import { memo } from "react";
import { useCountDown } from "@/hooks";
import { TInventory } from "@/types";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAuction } from "@/lib/auction";
import { toast } from "sonner";

export const Item = memo(({ endTime, bids, _id, id, title, status, slug, startingBidAmount, currentBidAmount, images }: TInventory & { useInProfile?: boolean }) => {
  const queryClient = useQueryClient();
  const { time, isClosed } = useCountDown({
    closingDate: endTime,
    status,
    disabled: status == "pending",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return updateAuction(_id || id, { status: "cancelled" });
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: () => {
      toast.error("Updated!");
      queryClient.invalidateQueries({ queryKey: [cacheTags.auctionItems] });
    },
  });

  return (
    <article className={cn("w-full border px-4 bg-white border-[#EEEEEE] rounded-[8px] sm:max-w-[392px]")}>
      <section className="pt-4 pb-[12px] relative w-full">
        <div className="h-[220px] relative w-full">
          <Image className="object-contain" fill alt={`${title} image`} src={images[0]?.image_url} />
        </div>
        <div className="flex  top-2 absolute w-full flex-row items-center justify-between">
          <div
            className={cn(
              "bg-input rounded-[6px] py-[2px] px-[6px] text-[12px] leading-[20px] -tracking-[0.3px]",
              isClosed && "bg-[#2D5BFF] text-white",
              status == "cancelled" && "bg-[#FF0000] text-white",
              status == "pending" && "bg-green-500",
              status == "ongoing" && "bg-orange-500 text-white"
            )}
          >
            {/* {status == "cancelled" ? "Cancelled" : status == "pending" ? "Pending" : isClosed ? "Closed" : time} */}
            {status == "cancelled" ? "Cancelled" : status == "pending" ? "Pending" : status == "ongoing" ? "Ongoing" : "Closed"}
          </div>

          {isClosed && (
            <div className="border ml-auto place-content-end flex flex-row  rounded-[4px] items-center px-[10px] py-[7px] font-medium border-input">
              <FaLock size={14} />
              <span>{bids.length}</span>
            </div>
          )}
        </div>
        <div className="w-full">
          <p className="text-[#666666] text-ellipsis truncate">{title}</p>
          <p className="text-[12px] leading-[20px]">Starting Bid: ₦{startingBidAmount.toLocaleString()}</p>
        </div>
      </section>
      <footer className="flex flex-row py-3 border-t border-input justify-between">
        {status !== "pending" && (
          <div>
            <p className="text-[12px] leading-[20px]">{isClosed ? "Closed Bid at" : "Current Bid"} </p>
            <p className="font-medium text-base">₦{currentBidAmount.toLocaleString()}</p>
          </div>
        )}

        <div className="flex flex-row ml-auto gap-2 items-center">
          {!isClosed && (
            <Button onClick={() => mutate()} disabled={isPending} variant="outline" size="sm">
              <X size={16} />
              <span>Cancel</span>
            </Button>
          )}

          <Link
            href={`${Routes.Home}/${slug}`}
            className={buttonVariants({
              size: "sm",
            })}
          >
            <EllipsisVertical size={16} />
            <span>View Item</span>
          </Link>
        </div>
      </footer>
    </article>
  );
});

Item.displayName = "Item";
