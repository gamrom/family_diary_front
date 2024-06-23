import Image from "next/image";
import { useRouter } from "next/navigation";
import { BackBtn } from "./BackBtn";

export const ClosePageNav = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="items-center sticky pt-[35px] h-[84px] bg-white top-0 flex justify-between bg-white max-w-[332px] w-full shrink-0">
      {children}
    </div>
  );
};
