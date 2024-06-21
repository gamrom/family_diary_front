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

  const diary = await getDiary(id);

  if (!diary) {
    return (
      <div className="main-container">
        등록된 일기가 존재하지 않습니다.
        <button>
          <a href="/">Home으로 돌아가기</a>
        </button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Content diary={diary} />
    </div>
  );
}
