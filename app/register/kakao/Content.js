"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-2xl">카카오 로그인 중...</div>
    </div>
  );
};

export const Content = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoLoginContent />
    </Suspense>
  );
};
