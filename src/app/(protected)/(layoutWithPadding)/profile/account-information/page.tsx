"use client";

import { AccountInformation } from "@/components/account-information";
import { Loading } from "@/components/shared";
import { useGetUser, useTitle } from "@/hooks";

export default function Page() {
  useTitle("Account Information");
  const { data: user, isPending } = useGetUser();
  if (isPending) return <Loading />;
  return <AccountInformation {...user!} />;
}
