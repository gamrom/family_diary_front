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

  // if (typeof window !== "undefined") {
  postKakaoAuth({
    code,
    redirect_uri: `${process.env.NEXT_PUBLIC_ORIGIN}/register/kakao`,
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
  // }

  return <LoadingFallback />;
};

export const Content = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <KakaoLoginContent />
    </Suspense>
  );
};
