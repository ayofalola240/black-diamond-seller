"use client";

import { Item } from "./item";
import { Empty, Loading, Pagination } from "@/components/shared";
import { auctionLimit, cn, Routes } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TAuctions } from "@/types";

interface IProps {
  useInProfile?: boolean;
  page?: number;
  limit?: number;
  auctions?: TAuctions;
  isLoading?: boolean;
  error?: any;
  setStatus?: (value: string) => void;
  status?: string;
}

const statusArray = ["all", "pending", "ongoing", "cancelled", "completed"];

export const SharedItemComponent = ({ useInProfile = false, page = 1, limit = auctionLimit, isLoading, error, auctions, setStatus, status = "all" }: IProps) => {
  // Handle status filter change
  const handleStatusChange = (value: string) => {
    if (setStatus) {
      setStatus(value);
    }
  };

  return (
    <>
      <header className={cn("flex flex-col gap-4 sm:flex-row items-start sm:items-center border-b pb-[20px] border-[#EEEEEE] justify-between", useInProfile && "border-0 pb-0")}>
        <h2>{useInProfile ? "Uploaded Items" : "All Items"}</h2>
        <div className="flex flex-row gap-2 items-center whitespace-nowrap">
          <p className="text-white">Filter By Category:</p>
          <Select onValueChange={handleStatusChange} name="category" value={status}>
            <SelectTrigger className={cn("text-sm min-w-[200px] text-white bg-transparent h-[40px] font-normal capitalize rounded-[4px]")}>
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent>
              {statusArray.map((item) => (
                <SelectItem className="capitalize" key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {error ? (
        <p className="text-red-500">{error.message}</p>
      ) : isLoading || !auctions ? (
        <Loading />
      ) : auctions.pagination.totalItems === 0 ? (
        <Empty
          className={cn(useInProfile && "py-0")}
          description="You have not uploaded any item yet. All Items you upload for the auction would be seen here."
          iconUrl="/svgs/cart.svg"
          link={Routes.Upload}
          linkText="Upload an Item to Auction"
          title="No Auction Yet"
        />
      ) : (
        <>
          <section className={cn("grid gap-[10px] grid-cols-1 sm:grid-cols-2", !useInProfile && "lg:grid-cols-4")}>
            {auctions.auctions.map((item) => (
              <Item key={item._id} {...item} useInProfile={useInProfile} />
            ))}
          </section>
          {!useInProfile && <Pagination isServerSide currentPage={page} totalCount={auctions.pagination.totalItems} pageSize={limit} />}
        </>
      )}
    </>
  );
};
