"use client";
import { CurrentPayment, PastPayment, SettlementAccount } from "@/components/payment-information";
import { Loading } from "@/components/shared";
import { useGetUser, useTitle } from "@/hooks";

export default function PaymentInformation() {
  useTitle("Payment Information");
  const { data: user, isPending } = useGetUser();
  if (isPending) return <Loading />;

  return (
    <section className="max-w-[720px] flex flex-col gap-8 h-full">
      <SettlementAccount {...user!} />
      <CurrentPayment />
      <PastPayment />
    </section>
  );
}
