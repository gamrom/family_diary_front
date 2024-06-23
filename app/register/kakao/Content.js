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
};

export const Content = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <KakaoLoginContent />
    </Suspense>
  );
};
