"use client";
import { useGetMerchantTransactions } from "@/hooks";
import { PaymentItem } from "./payment-item";
import { Empty, Error, Loading, Pagination } from "../shared";
import { useState } from "react";

export const PastPayment = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetMerchantTransactions({
    page,
    limit: 4,
    item: "received",
  });

  return (
    <section className="flex text-white flex-col gap-4">
      <header>
        <h2>Past Payment</h2>
        <p>View past payment and won auction items</p>
      </header>
      {isLoading || !data ? (
        <Loading className="py-0" />
      ) : error ? (
        <Error title="Something went wrong" />
      ) : (
        <>
          {data.pagination.totalItems == 0 ? (
            <Empty className="py-0 items-start max-w-full" iconUrl="/svgs/cart.svg" description="No Payment has been made yet" />
          ) : (
            <>
              <section className="divide-y px-4 divide-y-input">
                {data.data.map((item) => {
                  return (
                    <PaymentItem
                      paymentDate={item.payment.createdAt ? new Date(item.payment.createdAt) : new Date()}
                      key={item.id}
                      paidBy={item.buyer.firstName + " " + item.buyer.lastName}
                      paidByImage={item.buyer.image.image_url}
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
