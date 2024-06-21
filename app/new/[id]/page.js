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
  return (
    <div>
      <Content diary={diary} />
    </div>
  );
}
