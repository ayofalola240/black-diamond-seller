import { axiosClient } from "@/lib/api";
import { cacheTags } from "@/lib/utils";
import { TBank, TCategories } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const data = useQuery({
    queryKey: [cacheTags.categories],
    queryFn: () => axiosClient.get("/auctions/categories").then((res) => res.data) as Promise<TCategories>,
  });
  return data;
};

export const useGetBanks = () => {
  const data = useQuery({
    queryKey: [cacheTags.banks],
    queryFn: () => axiosClient.get("/payments/list-banks").then((res) => res.data) as Promise<TBank[]>,
  });
  return data;
};
