"use client";

import { useCountDown, useGetUser, useTitle } from "@/hooks";
import { Button, buttonVariants } from "@/components/ui/button";
import { RiDeleteBin5Line, RiEditFill } from "react-icons/ri";
import { LastBidders } from "./last-bidder-item";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TInventory } from "@/types";
import { cacheTags, cn, Routes } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

export const ItemDetails = ({ status, seller, _id, id, title, bids, slug, startingBidAmount, endTime, currentBidAmount, escrowType }: TInventory) => {
  useTitle(title);
  const { data } = useGetUser();
  const { time, isClosed } = useCountDown({
    status,
    closingDate: endTime,
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => axiosClient.delete(`/auctions/${_id}/hard`),
    onError: (error) => {
      toast.error("An error occurred. Please try again");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cacheTags.auctionItems] });
      router.replace(Routes.Home);
    },
  });

  return (
    <article className="flex flex-col text-white gap-4 sm:gap-8">
      <div className="flex flex-row items-center gap-1">
        <div className="border-[#999999] rounded py-[2px] px-[6px] capitalize w-fit text-[12px]  bg-primary">{escrowType} Auction</div>
        {escrowType == "private" && data?.id == seller?._id && (
          <Button
            className="text-[12px] h-[22px]"
            onClick={async () => {
              const text = `https://black-diamond.ng/${slug}`;
              await navigator.clipboard.writeText(text);
              toast.success("Link copied to clipboard");
            }}
            size="sm"
            variant="outline"
          >
            Copy Link
          </Button>
        )}
      </div>
      <header>
        <h1 className="text-2xl font-bold  sm:text-3xl">{title}</h1>
        <p className="text-[#999999] text-lg sm:text-xl">Starting Bid: ₦{startingBidAmount.toLocaleString()}</p>
      </header>
      <div>
        <p className="text-[#999999] text-lg sm:text-xl">Current Bid:</p>
        <p className="text-2xl font-bold sm:text-3xl">₦{currentBidAmount.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-[#999999] text-lg sm:text-xl">Bidding closes in</p>
        <p className="text-xl sm:text-2xl font-medium">{status == "pending" ? "Pending" : isClosed ? "Closed" : time}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Link href={`${Routes.Upload}?auctionId=${encodeURIComponent(slug)}`} className={buttonVariants({ className: "flex w-full sm:w-auto  flex-row items-center gap-1" })}>
          <RiEditFill />
          <span>Edit Details</span>
        </Link>
        <Button onClick={() => mutate()} disabled={isPending} variant="outline" className="flex w-full sm:w-auto flex-row items-center gap-1">
          <RiDeleteBin5Line />
          <span>Remove Item from Auction</span>
        </Button>
      </div>
      <article className={cn("flex flex-col mt-4 sm:mt-0  items-start gap-4")}>
        <div className={cn("flex flex-col w-full", bids.length == 0 ? "gap-0" : "gap-4")}>
          <h3 className="text-xl font-medium">Last 3 Bidders</h3>
          {bids.length == 0 ? (
            <p className="text-[#999999] text-lg sm:text-xl">No Bidders yet</p>
          ) : (
            <ul className="flex w-full flex-col divide-y divide-[#EEEEEE]">
              {bids.slice(0, 3).map((item, index) => (
                <LastBidders key={index} index={index} amount={item.amount} name={item.bidder.firstName + " " + item.bidder.lastName} bidDate={new Date(item.timestamp)} />
              ))}
            </ul>
          )}
        </div>

        <Link href={`/items/${slug}/activities?auctionId=${_id || id}&title=${title}`} className="flex flex-row text-lg font-medium items-center">
          <IoIosArrowRoundForward size={24} className="-rotate-45 hidden sm:flex" />
          <span>View bidding activities on this Auction</span>
        </Link>
      </article>
    </article>
  );
};
