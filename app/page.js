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
  // const user = await getCurrentUser();

  // if (!user) {
  //   redirect("/login");
  // }

  // const diaries = await getDiaries();

  // if (!diaries) {
  //   return <div>일기를 불러오는 중에 오류가 발생했습니다.</div>;
  // }

  const diaries = [
    {
      id: 1,
      content: "asdfasdf",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      audio_url:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      released_date: "2024-06-25",
    },
  ];

  const user = [
    {
      id: 1,
      name: "asdfasdf",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
  ];

  console.log("user", user);

  return (
    <div className="main-container">
      <Content diaries={diaries} user={user} />
    </div>
  );
}
