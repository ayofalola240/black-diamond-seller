import Image from "next/image";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface IProps {
  productImage: string;
  name: string;
  amount: number;
  slug?: string;
  /**
   * Date when the payment was made by the buyer
   */
  paymentDate?: Date;

  paidBy?: string;
  paidByImage?: string;
}
export const PaymentItem = ({ productImage, name, amount, paymentDate, slug, paidBy, paidByImage }: IProps) => {
  return (
    <article className="flex py-4 gap-4 flex-col sm:flex-row items-start sm:items-center justify-between w-full">
      <div className="flex-col items-start sm:items-center sm:flex-row flex gap-4 flex-wrap">
        <div className="relative h-[100px] rounded-[8px] border p-1 w-[100px]">
          <Image className="object-contain" fill src={productImage} alt={`${name} Image`} />
        </div>
        <div className="flex gap-1 flex-col">
          <p className="font-medium">{name}</p>
          <p className="text-[#666666]">
            Amount collected: ₦{amount.toLocaleString()} {paymentDate && `• ${format(new Date(paymentDate), "MMM do, yyyy hh:mm a")}`}{" "}
          </p>
          {paymentDate && (
            <p className="flex text-[#666666] flex-row mt-1 items-center gap-2">
              Paid by{" "}
              <Avatar className="w-[32px] h-[32px]">
                <AvatarImage src={paidByImage} />
                <AvatarFallback>{paidBy?.split(" ")[0].charAt(0)?.toUpperCase() + "" + paidBy?.split(" ")[1].charAt(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-white">{paidBy}</span>
            </p>
          )}
        </div>
      </div>

      {/* If the payment has been made, there's no reason showing this button again */}
      {!paymentDate && <Button size="sm">View Item</Button>}
    </article>
  );
};
