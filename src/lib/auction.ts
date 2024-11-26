import { TAuctions, TInventory } from "@/types";
import { axiosClient } from "./api";

export const createAuction = async (formData: FormData) => {
  return await axiosClient.post("/auctions/create-auction-item", formData).then((res) => res.data as { auction: TInventory });
};
export const updateAuction = async (id: string, arg: Record<string, any>) => {
  return await axiosClient.patch(`/auctions/update-auction/${id}`, arg).then((res) => res.data as { auction: TInventory });
};

export const getAllAuctions = async ({ page, limit, status }: { page: number; limit: number; status?: string }) => {
  const { data } = await axiosClient.get(`/users/auctions?page=${page}&limit=${limit}${status !== "all" ? `&status=${status}` : ""}`);
  return data as TAuctions;
};

export const getAuction = async (uid: string) => {
  const { data } = await axiosClient.get(`/auctions/${uid}`);
  return data.auction as TInventory;
};
