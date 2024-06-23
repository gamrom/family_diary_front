"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { LoadingFallback } from "@/app/_components/LoadingFallback";

import { postKakaoAuth } from "@/app/_hooks/api";

const KakaoLoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  postKakaoAuth({
    code,
    redirect_uri: `${window?.location?.origin}/register/kakao`,
  })
    .then((res) => {
      if (res.status === 200) {
        router.push("/?login=true");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("카카오 로그인에 실패했습니다.");
    });

  return (
    <div className="loading-overlay">
      <button type="button" className="absolute top-[35px] right-[48px]">
        <div className="w-[15px] h-[15px]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 14L7.50001 7.50003M7.50001 7.50003L14 1M7.50001 7.50003L1 1M7.50001 7.50003L14 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
        <div className="loading-spinner loading-spinner-size_change"></div>
        <div className="font-[700] text-white">LOADING..</div>
      </div>
    </div>
  );
};

export const Content = () => {
  return (
    <Suspense
      fallback={
        <div className="loading-overlay">
          <button type="button" className="absolute top-[35px] right-[48px]">
            <div className="w-[15px] h-[15px]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 14L7.50001 7.50003M7.50001 7.50003L14 1M7.50001 7.50003L1 1M7.50001 7.50003L14 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          <div className="flex flex-col h-[150px] w-[200px] justify-between items-center">
            <div className="loading-spinner loading-spinner-size_change"></div>
            <div className="font-[700] text-white">LOADING..</div>
          </div>
        </div>
      }
    >
      <KakaoLoginContent />
    </Suspense>
  );
};
