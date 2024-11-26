import Image from "next/image";
import { ComponentProps } from "react";

export const InfoImage: React.FC<{ url: string; isIcon?: boolean } & Partial<Omit<ComponentProps<typeof Image>, "src">>> = ({ url, isIcon, alt = "Image", ...rest }) => {
  return <Image src={url} width={isIcon ? 24 : 160} height={isIcon ? 24 : 160} alt={alt} {...rest} />;
};
