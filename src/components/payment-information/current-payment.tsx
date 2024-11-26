"use client";
import { useGetMerchantTransactions } from "@/hooks";
import { InfoComponent } from "./info-component";
import { PaymentItem } from "./payment-item";
import { Empty, Error, Loading, Pagination } from "../shared";
import { useState } from "react";

export const CurrentPayment = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetMerchantTransactions({
    page,
    limit: 4,
    item: "not_received",
  });

  return (
    <section className="flex text-white flex-col gap-4">
      <header>
        <h2>Current Payment</h2>
        <p>Payment made from buyer and currently still being held in Escrow.</p>
      </header>
      {isLoading || !data ? (
        <Loading className="py-0" />
      ) : error ? (
        <Error title="Something went wrong" />
      ) : (
        <>
          {data.pagination.totalItems == 0 ? (
            <Empty className="py-0 items-start max-w-full" iconUrl="/svgs/cart.svg" description="Buyers are yet to pay for your auctions" />
          ) : (
            <>
              <InfoComponent
                title="Payment are secure with Sparkle Escrow!"
                content="Your payment is currently securely held with Sparkle Escrow and will not be released to you just yet.  Once the buyer receives their item they would authorize payment to the settlement account provided."
              />
              <section className="divide-y px-4 divide-y-input">
                {data.data.map((item) => {
                  return (
                    <PaymentItem
                      key={item.id}
                      slug={item.auction.slug}
                      amount={item.auction.currentBidAmount}
                      name={item.auction.title}
                      productImage={item.auction.images[0].image_url}
                    />
                  );
                })}
              </section>
              <Pagination pageSize={4} totalCount={data.pagination.totalItems} setValue={setPage} currentPage={page} />
            </>
          )}
        </>
      )}
    </section>
  );
};
