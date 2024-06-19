import { fetcher } from "@/app/_hooks/fetcher";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { Logout } from "@/app/_components/Logout";

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

  return (
    <div className="flex flex-col my-1">
      <Logout />
      <a href="/recording/new">오늘 일기 작성하러 가기</a>
    </div>
  );
}
