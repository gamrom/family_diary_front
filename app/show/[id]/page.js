import { Content } from "./Content";
import { fetcher } from "@/app/_hooks/fetcher";
import { cookies } from "next/headers";

async function getDiary(id) {
  const res = await fetcher(`/diaries/${id}`, cookies());

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page({ params }) {
  const { id } = params;

  // const diary = await getDiary(id);

  // if (!diary) {
  //   return (
  //     <div className="main-container">
  //       등록된 일기가 존재하지 않습니다.
  //       <button>
  //         <a href="/">Home으로 돌아가기</a>
  //       </button>
  //     </div>
  //   );
  // }
  const diary = {
    id: 1,
    content: "asdfasdf",
    image_url:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    audio_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    released_date: "2024-06-25",
  };

  return (
    <div className="main-container">
      <Content diary={diary} />
    </div>
  );
}
