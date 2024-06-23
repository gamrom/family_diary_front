// components/Loading.js

import Image from "next/image";
import { useState } from "react";

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [loading, setLoading] = useState(isLoading);

  return loading ? (
    <div className="loading-overlay">
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <div className="loading-spinner loading-spinner-size_change"></div>
        <div className="font-[700] text-white">LOADING..</div>
      </div>
    </div>
  ) : null;
};
