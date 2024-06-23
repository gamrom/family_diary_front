"use client";
import Image from "next/image";

export const LoadingFallback = () => {
  return (
    <div className="loading-overlay">
      <button type="button" className="absolute top-[35px] right-[48px]">
        <div className="w-[15px] h-[15px]">
          <Image src="/x_white.svg" width={13} height={13} alt="닫기" />
        </div>
      </button>
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <div className="loading-spinner loading-spinner-size_change"></div>
        <div className="font-[700] text-white">LOADING..</div>
      </div>
    </div>
  );
};
