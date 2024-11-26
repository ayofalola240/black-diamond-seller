import { axiosClient } from "@/lib/api";
import { cacheTags } from "@/lib/utils";
import { TUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const data = useQuery({
    queryKey: [cacheTags.user],
    queryFn: () => axiosClient.get("/users/user-details").then((res) => res.data.user) as Promise<TUser>,
  });
  return data;
};
