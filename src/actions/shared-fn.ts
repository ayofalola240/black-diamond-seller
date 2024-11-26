"use server";

import { createAxiosClient } from "@/lib/api";
import { TAuctionPerformance, TBiddersPerformance, TBids, TPaginationSearchParams } from "@/types";
import { cookies } from "next/headers";

export const getServerClient = async () => {
  const cookieStore = cookies();

  const cookiesToSend = {
    blackDiamondMerchant: cookieStore.get("blackDiamondMerchant"),
    session: cookieStore.get("session"),
    "session.sig": cookieStore.get("session.sig"),
  };

  const filteredCookies = Object.entries(cookiesToSend)
    .filter(([, cookie]) => cookie)
    .map(([name, cookie]) => `${name}=${cookie?.value}`)
    .join("; ");

  const availableHeaders = {
    Cookie: filteredCookies,
  };

  return createAxiosClient(availableHeaders);
};

export const getAuctionBids = async ({ page, limit, auctionId }: TPaginationSearchParams & { auctionId: string }) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(`/auctions/${auctionId}/bids/?page=${page}&limit=${limit}`);
  return res.data as TBids;
};

export const getAllBids = async ({ page, limit }: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(`/bids?page=${page}&limit=${limit}`);
  return res.data as TBids;
};

export const getBiddersPerformance = async ({ page, limit }: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(`/users/bidders-performance?page=${page}&limit=${limit}`);
  return res.data as TBiddersPerformance;
};

export const getAuctionPerformance = async ({ page, limit }: TPaginationSearchParams) => {
  const serverClient = await getServerClient();
  const res = await serverClient.get(`/auctions/auctions-performance?page=${page}&limit=${limit}`);
  return res.data as TAuctionPerformance;
};
