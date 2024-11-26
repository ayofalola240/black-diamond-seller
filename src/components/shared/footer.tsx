import { Routes } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const gridItems = [
  [
    {
      label: "Bidding Activity",
      url: Routes.Activities,
    },
    {
      label: "LeaderBoard",
      url: Routes.LeaderBoards,
    },
  ],
  [
    {
      label: "Black Diamond",
      url: "/",
    },
    // {
    //   label: "The Foundation",
    //   url: Routes.Foundation,
    // },
  ],
  [
    // {
    //   label: "Legal",
    //   url: "/",
    // },
    {
      label: "Terms & Conditions",
      url: Routes.Terms,
    },
    {
      label: "Privacy Policy",
      url: Routes.Privacy,
    },
  ],
];

export const Footer = () => {
  return (
    <footer className="bg-[#231F20] text-white py-[64px] px-6">
      <div className="max-w-container mx-auto flex flex-col w-full">
        <section className="flex w-full gap-6 justify-between flex-col sm:flex-row">
          <Image width={146} height={93} src="/svgs/logo-with-text.svg" alt="Black Diamond's Logo" />
          <div className="grid grid-cols-2 gap-y-4 sm:gap-12 sm:grid-cols-3">
            {gridItems.map((items, index) => (
              <div className="space-y-6" key={index}>
                {items.map((item) => (
                  <Link href={item.url} className="font-weight leading-[30px] block text-lg -tracking-[0.8px]" key={item.label}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>
        <hr className="my-[38px] border-[#EEEEEE]" />
        <div className="flex flex-col items-start sm:items-center w-full justify-between sm:flex-row gap-4">
          <p className="text-[12px] -tracking-[0.3px]">© 2024 Black Diamond Foundation.</p>
          <div className="flex gap-4 items-center flex-row flex-wrap">
            <p className="text-[12px] -tracking-[0.3px]">All payments are 100% secured and powered by </p>
            <Image src="/svgs/sparkle.svg" alt="Sparkle's Logo" width={122} height={32} />
          </div>
        </div>
      </div>
    </footer>
  );
};
