import { getAllBids } from "@/actions/shared-fn";
import { BidTable } from "@/components/bids";
import { RefreshButton } from "@/components/bids/refresh-buton";
import { DataTableTime, Pagination } from "@/components/shared";
import { pageLimit } from "@/lib/utils";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: IProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || pageLimit;
  const bids = await getAllBids({ limit, page });

  return (
    <section className=" w-full  text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-10  ">
      <header className="pb-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full border-b border-[#EEEEEE]">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-xl sm:text-2xl">Bidding Activity</h1>
          <span className="text-[#666666]  whitespace-nowrap flex flex-row items-center gap-1">
            Updated <DataTableTime date={new Date()} index={-1} showOnlyMinutesPassed />
          </span>
        </div>
        <RefreshButton />
      </header>
      <BidTable isUseInAllBids bids={bids.bids} auction={bids.auction} />
      <Pagination isServerSide totalCount={bids.pagination.totalItems} pageSize={pageLimit} currentPage={page} />
    </section>
  );
}

export async function generateMetadata() {
  return {
    title: `Bidding Activity`,
  };
}
