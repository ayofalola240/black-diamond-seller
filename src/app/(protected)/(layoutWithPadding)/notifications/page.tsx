"use client";

import { Empty, Error, Loading } from "@/components/shared";
import { Button, buttonVariants } from "@/components/ui/button";
import { useGetNotifications, useTitle } from "@/hooks";
import { axiosClient } from "@/lib/api";
import { cacheTags, formatError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "sonner";

export default function Page() {
  const { data, isPending, error, countOfNewNotification } = useGetNotifications();
  useTitle(`Notifications (${countOfNewNotification})`);

  console.log(data, countOfNewNotification);
  const queryClient = useQueryClient();
  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: (notificationId: string) => {
      return axiosClient.patch(`/notifications/${notificationId}/read`);
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: () => {
      toast.success("Marked as read");
      queryClient.invalidateQueries({ queryKey: [cacheTags.notifications] });
    },
  });

  if (isPending) return <Loading />;

  if (error) return <Error title="Something went wrong" desc={formatError(error)} />;

  return (
    <section className="w-full text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-6 ">
      <header className="sm:pb-[20px] sm:border-b border-[#EEEEEE]">
        <h2 className="section-header">
          Your Notification{countOfNewNotification > 1 && "s"} ({countOfNewNotification})
        </h2>
      </header>
      {data.length == 0 ? (
        <Empty
          className="py-0"
          iconUrl="/svgs/notification.svg"
          title="You have no Notification"
          description="You have no notification just yet. All news, information and updates would appear here when you do"
        />
      ) : (
        <section className="flex divide-y divide-y-input flex-col">
          {data.map((item, index) => {
            if (!item.auctionId) return;

            return (
              <article key={index} className="space-y-2 py-6">
                <header className="flex items-center flex-wrap flex-row gap-2">
                  {item.status == "new" && <div className="bg-primary rounded-[6px] py-[2px] text-white px-[6px]">New</div>}

                  <h2 className="text-lg">{item.title}</h2>
                  <p className="text-[#999999] text-sm">{format(new Date(item.timestamp), "MMM do, yyyy h:mmaaa")}</p>
                </header>
                <p>{item.message}</p>
                <footer className="flex gap-[10px] flex-col sm:flex-row">
                  <Link
                    href={`/${item.auctionId.slug}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    <EllipsisVertical size={16} />
                    View details
                  </Link>
                  <Link href="#" className="flex flex-row w-full justify-center sm:justify-start  text-lg font-medium items-center">
                    <IoIosArrowRoundForward size={24} className="-rotate-45 flex" />
                    <span>View bidding activities</span>
                  </Link>
                  <Button disabled={isPendingMutation} onClick={() => mutate(item.id)} size="sm">
                    Mark as Read
                  </Button>
                </footer>
              </article>
            );
          })}
        </section>
      )}
    </section>
  );
}
