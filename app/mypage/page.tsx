import { Content } from "./Content";
import { fetcher } from "@/app/_hooks/fetcher";
import { cookies } from "next/headers";

async function getCurrentUser() {
  const res = await fetcher(`/current_user`, cookies());

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="main-container">
      <Content user={user} />
    </div>
  );
}
