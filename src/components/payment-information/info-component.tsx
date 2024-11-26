import { IoIosInformationCircle } from "react-icons/io";

interface Iprops {
  title: string;
  content: string;
}
export const InfoComponent = ({ title, content }: Iprops) => {
  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #00000005" }}
      className="w-full px-4 py-[20px] rounded-[8px] border flex flex-row gap-[10px] items-start sm:items-center border-[#666]"
    >
      <div className="min-w-[20px]">
        <IoIosInformationCircle color="white" size={20} />
      </div>
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="twelve">{content}</p>
      </div>
    </div>
  );
};
