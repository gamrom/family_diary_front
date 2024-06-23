"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function KakaoButton() {
  const KAKAO_SDK = "https://developers.kakao.com/sdk/js/kakao.js";
  const KAKAO_TOKEN = process.env.NEXT_PUBLIC_KAKAO_JS_KEY; // js

  const [kakaoRedirect, setKakaoRedirect] = useState(null);

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.authorize({
      redirectUri: kakaoRedirect,
      scope: "profile_image,account_email",
    });
  };

  const initializeKakaoLogin = () => {
    if (!window.Kakao.isInitialized()) {
      // javascript key 를 이용하여 initialize
      window.Kakao.init(KAKAO_TOKEN);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK;
    script.onload = () => initializeKakaoLogin();
    document.body.appendChild(script);

    setKakaoRedirect(process.env.NEXT_PUBLIC_ORIGIN + "/register/kakao");
    return () => script.remove();
  }, []);

  return (
    <button
      type="button"
      className="mt-[69px] w-full bg-[#FDE500] flex items-center justify-center py-[18px] rounded-[26px]"
      onClick={kakaoLoginClickHandler}
    >
      <Image src="/kakao.svg" width={16} height={15} alt="카카오로그인" />
      <div className="text-sm font-[600] ml-[15px]">카카오로 시작하기</div>
    </button>
  );
}
