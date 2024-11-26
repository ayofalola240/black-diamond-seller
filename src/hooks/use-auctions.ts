import { axiosClient } from "@/lib/api";
import { getAllAuctions, getAuction } from "@/lib/auction";
import { cacheTags } from "@/lib/utils";
import { TActiveBids, TCart, TInventory, TPaymentTransactions } from "@/types";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props extends Partial<UseQueryOptions> {
  page: number;
  limit: number;
  status?: string;
}

export const useGetAuctions = ({ page, limit, status }: Props) => {
  const data = useQuery({
    queryKey: [cacheTags.auctionItems, page, limit, status && status],
    queryFn: () => getAllAuctions({ page, limit, ...(status && { status }) }),
    placeholderData: keepPreviousData,
  });
  return data;
};

interface IAuction extends Partial<UseQueryOptions<TInventory>> {
  slug: string;
}
export const useGetAuction = ({ slug, ...rest }: IAuction) => {
  const data = useQuery({
    queryKey: [cacheTags.auctionItems, slug],
    queryFn: () => getAuction(slug),
    enabled: !!slug,
    ...rest,
  });
  return data;
};

export const useCart = () => {
  const [cartLength, setCartLength] = useState(0);
  const data = useQuery({
    queryKey: [cacheTags.carts],
    queryFn: () => axiosClient.get<TCart>("/users/cart"),
    staleTime: 1000 * 60 * 3, //3mins stale time
  });

  useEffect(() => {
    if (data.data) {
      setCartLength(data.data.data.totalItems || 0);
    }
  }, [data.data]);

  return { ...data, cartLength };
};

export const useGetMerchantTransactions = ({
  limit = 4,
  page = 1,
  item,
}: Props & {
  item: "received" | "not_received";
}) => {
  const data = useQuery({
    queryKey: [cacheTags.merchantTransactions, page, limit, item],
    queryFn: () => axiosClient.get(`/payments/transactions?page=${page}&limit=${limit}&item=${item}&user=seller`).then((res) => res.data as TPaymentTransactions),
    placeholderData: keepPreviousData,
  });
  return data;
};

export const useGetActiveBids = ({ page = 1, limit = 4 }: Props) => {
  const data = useQuery({
    queryKey: [cacheTags.activebids, page, limit],
    queryFn: () => axiosClient.get(`/bids/active-bids?page=${page}&limit=${limit}`).then((res) => res.data as TActiveBids),
    placeholderData: keepPreviousData,
  });
  return data;
};
