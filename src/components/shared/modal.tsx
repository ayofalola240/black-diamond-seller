import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Dispatch, memo, ReactNode, SetStateAction } from "react";
import { InfoImage } from "./info-image";
import { Button, ButtonProps } from "../ui/button";
import Link from "next/link";

interface IProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  children?: ReactNode;
  image?: string;
  link?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  footer?: {
    text: string;
    action?: () => void;
    icon: ReactNode;
    buttonProps?: ButtonProps;
  }[];
}

export const Modal = memo(
  ({ isOpen, children, link, image = "/svgs/success.svg", footer, title = "Success", description = "You have successfully uploaded an item.", setIsOpen }: IProps) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="flex py-[32px] w-[95vw] text-white bg-[#111] flex-col items-center">
          <InfoImage url={image} />
          <h2>{title}</h2>
          <p className="-tracking-[0.5px] text-center">{description}</p>
          {link && (
            <Link href={link} className="text-[#666666] -tracking-[0.5px] text-center">
              {description}
            </Link>
          )}

          {children && children}

          {footer && footer.length > 0 ? (
            <footer className="flex flex-row justify-center items-center gap-2">
              {footer.map((item, index) => (
                <Button
                  onClick={item.action}
                  variant={index == 0 ? "outline" : "default"}
                  key={item.text}
                  size="sm"
                  className="flex min-w-[150px] flex-row gap-1"
                  {...item.buttonProps}
                >
                  {index === 0 && item.icon}
                  {item.text}
                  {index === 1 && item.icon}
                </Button>
              ))}
            </footer>
          ) : (
            <Button className="flex flex-row gap-1" size="sm" onClick={() => setIsOpen(false)}>
              Continue
              <InfoImage width={16} height={16} url="/svgs/arrow-svg.svg" />
            </Button>
          )}
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

Modal.displayName = "Modal";
