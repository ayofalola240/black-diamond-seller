import { BidderPerformance } from "@/components/leaderboards/bidders-performance";
import { ItemsPerformance } from "@/components/leaderboards/items-performance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <section className=" w-full  text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-10  ">
      <Tabs defaultValue="bidders" className="w-full flex flex-col">
        <header className="pb-[20px] mb-[20px] flex flex-col sm:flex-row items-start gap-4  sm:items-center justify-between w-full border-b border-[#EEEEEE]">
          <h1 className="text-xl sm:text-2xl">Auction Leaderboard</h1>
          <TabsList>
            <TabsTrigger value="bidders">Bidders Performance</TabsTrigger>
            <TabsTrigger value="items">Item Performance</TabsTrigger>
          </TabsList>
        </header>
        <TabsContent value="bidders">
          <BidderPerformance />
        </TabsContent>
        <TabsContent value="items">
          <ItemsPerformance />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export async function generateMetadata() {
  return {
    title: `Auction Leaderboards`,
  };
}
