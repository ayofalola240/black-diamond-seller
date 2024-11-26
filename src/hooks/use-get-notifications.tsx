import { axiosClient } from "@/lib/api";
import { cacheTags } from "@/lib/utils";
import { INotification } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getNotifications = async () => {
  const { data } = await axiosClient.get(`/notifications`);
  return data as INotification[];
};

export const useGetNotifications = () => {
  const [countOfNewNotification, setCountOfNewNotification] = useState(0);
  const data = useQuery({
    queryKey: [cacheTags.notifications],
    queryFn: () => getNotifications(),
  });

  useEffect(() => {
    if (data?.data) {
      if (data.data.length == 0) return;
      setCountOfNewNotification(
        data.data.filter((item) => item.status == "new").length
      );
    }
  }, [data.data]);

  return { ...data, countOfNewNotification };
};
