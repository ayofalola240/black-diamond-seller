"use client";
import { Carousel, Description, ItemDetails } from "@/components/items";
import { useGetAuction } from "@/hooks";
import { Error, Loading } from "@/components/shared";

export default function Item({ params: { slug } }: { params: { slug: string } }) {
  const { data: auction, isPending, error } = useGetAuction({ slug });

  if (isPending) return <Loading />;
  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <section className="grid py-[40px] gap-8 w-full sm:py-[80px] max-w-container mx-auto px-6 grid-cols-1 lg:grid-cols-2">
        <Carousel images={auction.images} />
        <ItemDetails {...auction} />
      </section>
      <article className="bg-[#000000] py-[40px] sm:py-[80px]">
        <div className="max-w-container text-white mx-auto px-6">
          <header className="pb-4 border-b border-[#EEEEEE]">
            <h2>Description</h2>
          </header>
          <Description description={auction.description} />
        </div>
      </article>
    </section>
  );
}
