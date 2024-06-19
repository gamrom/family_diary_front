import { fetcher } from "@/utils/fetcher";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

async function getCurrentUser() {
  const res = await fetcher(`/current_user`, cookies());

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <>로그인 완료</>
}
