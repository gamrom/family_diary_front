"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { postKakaoAuth } from "@/utils/api";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    postKakaoAuth({
      code,
      redirect_uri: window.location.origin + "/register/kakao",
    })
      .then((res) => {
        if (res.status === 200) {
          router.push("/?login=true");
        }
      })
      .catch((error) => {
        console.log(error)
        alert("카카오 로그인에 실패했습니다.");
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-2xl">카카오 로그인 중...</div>
    </div>
  );
}
