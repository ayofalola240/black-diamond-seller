import { getAuctionBids } from "@/actions/shared-fn";
import { BidTable } from "@/components/bids";
import { RefreshButton } from "@/components/bids/refresh-buton";
import { Pagination } from "@/components/shared";
import { pageLimit } from "@/lib/utils";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: IProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || pageLimit;
  const auctionId = searchParams?.auctionId as string;
  const title = searchParams?.title as string;
  const bids = await getAuctionBids({ auctionId, limit, page });

  return (
    <section className=" w-full  text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-10  ">
      <header className="sm:pb-[20px] flex flex-row items-center justify-between w-full sm:border-b border-[#EEEEEE]">
        <div>
          <h1 className="text-2xl">{decodeURIComponent(title)}</h1>
          <p className="text-[#999]">Bidding Activity</p>
        </div>
        <RefreshButton />
      </header>
      <BidTable bids={bids.bids} auction={bids.auction} />
      <Pagination isServerSide totalCount={bids.pagination.totalItems} pageSize={pageLimit} currentPage={page} />
    </section>
  );
}

export async function generateMetadata({ searchParams }: IProps) {
  const title = searchParams?.title as string;
  return {
    title: `${decodeURIComponent(title)}`,
  };
}
