import { SharedItemComponent } from "@/components/shared";

export const metadata = {
  title: "Auction Information",
};

export default function AuctionPage() {
  return (
    <section className="gap-4 max-w-[794px] text-black flex-col flex">
      <SharedItemComponent useInProfile />
    </section>
  );
}
