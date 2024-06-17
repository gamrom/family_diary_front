import { Recorder } from "./Recorder";
import { SpeakToText } from "./SpeakToText";

async function getSttJwt() {
  const res = await fetch("https://openapi.vito.ai/v1/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${process.env.RETURNZERO_CLIENT_ID}&client_secret=${process.env.RETURNZERO_CLIENT_SECRET}`,
  });

  if (res.ok) {
    const sttRes = res.json();
    const { access_token, expire_at } = await sttRes;
    return access_token;
  }
}

export default async function Home() {
  const sttJwt = await getSttJwt();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Recorder />
      <SpeakToText sttJwt={sttJwt} />
    </main>
  );
}
