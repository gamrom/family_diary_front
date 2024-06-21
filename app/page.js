import { fetcher } from "@/app/_hooks/fetcher";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { Logout } from "@/app/_components/Logout";

import { Content } from "@/app/main/Content";
import dayjs from "dayjs";

async function getCurrentUser() {
  const res = await fetcher(`/current_user`, cookies());

  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function getDiaries() {
  const res = await fetcher(`/diaries`, cookies());

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

  const diaries = await getDiaries();

  if (!diaries) {
    return <div>일기를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const checkDiary = (date, diaries) => {
    return diaries.find((diary) => dayjs(diary.date).isSame(date, "day"));
  };

  const initialDiary = checkDiary(dayjs(), diaries);

  return (
    <div className="main-container">
      <Content diaries={diaries} initialDiary={initialDiary} />
    </div>
  );
}
