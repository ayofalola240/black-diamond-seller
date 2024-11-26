import Link from "next/link";
import { InfoImage } from "./info-image";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  iconUrl?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
}

export const Empty = ({ iconUrl = "/svgs/cart.svg", linkText, title, description, link, className }: IProps) => {
  return (
    <article className={cn("py-[150px] w-full h-full gap-4 flex-col max-w-[468px] mx-auto  text-white items-center justify-center flex", className)}>
      <InfoImage className="mr-6" url={iconUrl} />
      {title && <h2 className="font-medium text-2xl ">{title}</h2>}
      {description && <p className="text-center">{description}</p>}

      {link && (
        <Link
          href={link}
          className={buttonVariants({
            className: "flex w-full flex-row gap-[10px] items-center",
          })}
        >
          <span>{linkText}</span>
          <Image src="/svgs/arrow-svg.svg" alt="arrow Image" width={20} height={20} />
        </Link>
      )}
    </article>
  );
};
