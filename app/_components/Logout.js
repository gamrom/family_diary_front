"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/_hooks/api";

export const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      router.push("/login");
    });
  };

  return (
    <button
      type="button"
      className="bg-[#F5F5F5] text-[17px] font-[600] text-black w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
      onClick={handleLogout}
    >
      Sign out
    </button>
  );
};
