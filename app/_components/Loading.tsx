// components/Loading.js

import Image from "next/image";
import { useState } from "react";

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [loading, setLoading] = useState(isLoading);

  return loading ? (
    <div className="loading-overlay">
      <button
        type="button"
        onClick={() => {
          setLoading(false);
          window.location.reload();
        }}
        className="absolute top-[35px] right-[48px]"
      >
        <div className="w-[15px] h-[15px]">
          <Image src="/x_white.svg" width={13} height={13} alt="닫기" />
        </div>
      </button>
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <div className="loading-spinner"></div>
        <div className="font-[700] text-white">LOADING..</div>
      </div>
    </div>
  ) : null;
};