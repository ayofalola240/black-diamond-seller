"use client";

import { ComponentProps, ReactNode, useState } from "react";
import { buttonVariants } from "../ui/button";
import { Bell, Upload, User, Clock, X } from "lucide-react";
import { cacheTags, cn, formatError, Routes } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCountDown, useGetAuctions, useGetNotifications, useGetUser, useWindowDimensions } from "@/hooks";
import { Modal } from "./modal";
import { Form } from "../ui/form";
import { FormSelect } from "../forms";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoImage } from "./info-image";
import { axiosClient } from "@/lib/api";
import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const durations: Record<string, number> = {
  "0 minutes": 0,
  "5 minutes": 0.08333333333333333,
  "30 minutes": 0.5,
  "1hr": 1,
  "2hr": 2,
  "4hr": 4,
  "6hr": 6,
  "8hr": 8,
  "12hr": 12,
  "1day": 24,
  "2day": 48,
  "5day": 120,
  "10day": 240,
};

const formSchema = z.object({
  duration: z.string().min(1, { message: "Please select a duration" }),
});
type FormType = z.infer<typeof formSchema>;

interface IProps extends Partial<ComponentProps<typeof Link>> {
  label?: string;
}

interface IButtonProps extends Partial<ComponentProps<typeof Link>> {
  icon: ReactNode;
  label: string;
  currentRoute: string;
  disabled?: boolean;
  href?: any;
  hasOverlay?: boolean;
  overlayValue?: number;
  component?: React.ElementType;
}

export const ButtonLink = ({ icon, disabled = false, label, href, currentRoute, overlayValue, hasOverlay, component, className, ...rest }: IButtonProps) => {
  const pathname = usePathname();
  const { width: windowWidth } = useWindowDimensions();
  const Component = component || Link;
  return (
    <Component
      disabled={disabled}
      aria-disabled={pathname.includes(currentRoute)}
      className={buttonVariants({
        variant: "outline",
        size: windowWidth > 600 ? "default" : "sm",
        className: `w-full relative ${pathname.startsWith(currentRoute) && "opacity-50"}`,
      })}
      href={href}
      {...rest}
    >
      <div className={cn("flex w-full justify-start space-x-2 flex-row", className)}>
        {icon}

        {hasOverlay ? (
          <>
            <span className="absolute bg-white p-1   items-center justify-center w-[20px] h-[20px] right-0 -top-2 text-black rounded-full flex lg:hidden">{overlayValue}</span>
            <span className="truncate hidden lg:flex">
              {overlayValue} {label}
            </span>
          </>
        ) : (
          <span className="truncate hidden lg:flex">{label}</span>
        )}
      </div>
    </Component>
  );
};

export const NotificationBell = ({ className, ...rest }: IProps) => {
  const { countOfNewNotification } = useGetNotifications();
  return (
    <ButtonLink
      currentRoute={Routes.Notification}
      icon={<Bell />}
      label="Notifications"
      href={Routes.Notification}
      className={className}
      hasOverlay
      overlayValue={countOfNewNotification}
      {...rest}
    />
  );
};

export const StartAuction = ({ className, ...rest }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: ongoingAuctions, isLoading: gettingOngoingAuction } = useGetAuctions({ page: 1, limit: 1, status: "ongoing" });
  const { data, isLoading: gettingPendingItems } = useGetAuctions({ page: 1, limit: 100, status: "pending" });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const { isClosed, time } = useCountDown({
    disabled: !ongoingAuctions?.auctions[0],
    status: ongoingAuctions?.auctions[0]?.status,
    closingDate: ongoingAuctions?.auctions[0]?.endTime || new Date(),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (args: any) => {
      return axiosClient.post("/auctions/create-auction-group", args);
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: async () => {
      toast.success("Auction started successfully");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: [cacheTags.auctionItems] });
    },
  });

  async function onSubmit(values: FormType) {
    values.duration = (Number(durations[values.duration]) * 3600 * 1000).toString();
    mutate({
      duration: values.duration,
      auctionIds: data?.auctions.map((item) => item.id || []),
    });
  }

  return (
    <>
      <Modal
        image="/svgs/logo.svg"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Start Auction"
        description={
          data?.auctions.length == 0
            ? "You currently have no pending auction Items\nPlease upload more items"
            : "You are about to start the Auction for your items. How long do you want this Auction to Start?"
        }
        footer={[
          {
            text: "Cancel",
            action: () => {
              form.reset({ duration: "" });
              setIsOpen(false);
            },
            icon: <X size={16} />,
          },
          {
            text: "Start Auction",
            buttonProps: { form: "start-auction", type: "submit", disabled: isPending || data?.auctions.length == 0 },
            icon: <InfoImage width={16} height={16} url="/svgs/arrow-svg.svg" />,
          },
        ]}
      >
        {data && data?.auctions.length > 0 && (
          <Form {...form}>
            <form id="start-auction" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-[60px] w-full">
              <FormSelect<FormType> placeholder="Select" label="Duration" name="duration" options={Object.keys(durations)} />
            </form>
          </Form>
        )}
      </Modal>
      <ButtonLink
        disabled={gettingOngoingAuction || gettingPendingItems || !isClosed || data?.auctions?.length == 0}
        onClick={() => setIsOpen(true)}
        component={"button"}
        currentRoute={Routes.Upload}
        icon={<Clock />}
        label={isClosed ? "Start an Auction" : time}
        className={className}
        {...rest}
      />
    </>
  );
};

export const ShoppingCartComponent = ({ className, ...rest }: IProps) => {
  return <ButtonLink currentRoute={Routes.Upload} icon={<Upload />} label="Upload an item to Auction" href={Routes.Upload} className={className} {...rest} />;
};

export const UserComponent = () => {
  const { data: user, isPending } = useGetUser();
  return <ButtonLink currentRoute={Routes.AccountInformation} icon={<User />} label={isPending ? "Loading..." : `${user?.firstName} ${user?.lastName}`} href={Routes.Profile} />;
};
