"use client";

import { ClosePageNav } from "../_components/ClosePageNav";
import Image from "next/image";
import { BackBtn } from "../_components/BackBtn";
import { useState } from "react";
import { Logout } from "../_components/Logout";

export const Content = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <ClosePageNav>
        <div></div>
        <div></div>
        <BackBtn>
          <Image src="/x.svg" width={13} height={13} alt="닫기" />
        </BackBtn>
      </ClosePageNav>
      <Image
        src={user.profile_url ? user.profile_url : "/profile_default.png"}
        width={194}
        height={194}
        alt="default"
        className="mt-[170px] rounded-full object-cover"
      />

      <div className="text-[30px] font-[600] text-center mt-[50px]">
        {user.name ? user.name : "사용자"}
      </div>

      <div className="mt-[150px]"></div>
      <div className="flex space-x-[19px] w-full">
        <Logout />
        <button
          type="button"
          className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};
