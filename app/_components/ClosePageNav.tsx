import Image from "next/image";

export const ClosePageNav = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="absolute top-[34px] flex justify-between bg-white max-w-[332px] w-full">
      <div className="p-1 invisible">
        <Image src="/x.svg" width={13} height={13} alt="닫기" />
      </div>
      {children}
      <button type="button" className="p-1">
        <Image src="/x.svg" width={13} height={13} alt="닫기" />
      </button>
    </div>
  );
};
