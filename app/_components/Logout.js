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

  return <button onClick={handleLogout}>Logout</button>;
};
