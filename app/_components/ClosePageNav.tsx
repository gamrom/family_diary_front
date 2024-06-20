import Image from "next/image";
import { useRouter } from "next/navigation";
import { BackBtn } from "./BackBtn";

export const ClosePageNav = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="sticky pt-[35px] h-[84px] bg-white top-0 flex justify-between bg-white max-w-[332px] w-full">
      <div className="invisible p-1">
        <Image src="/x.svg" width={13} height={13} alt="닫기" />
      </div>
      {children}

      <BackBtn style="p-1">
        <Image src="/x.svg" width={13} height={13} alt="닫기" />
      </BackBtn>
    </div>
  );
};
