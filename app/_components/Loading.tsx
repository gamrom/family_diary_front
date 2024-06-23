// components/Loading.js

import { useState } from "react";

export const Loading = ({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text?: string;
}) => {
  const [loading, setLoading] = useState(isLoading);

  return loading ? (
    <div className="loading-overlay">
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <div className="loading-spinner loading-spinner-size_change"></div>
        <div className="font-[700] text-white">{text || "LOADING.."}</div>
      </div>
    </div>
  ) : null;
};
