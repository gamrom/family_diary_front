import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const response = await fetch("https://openapi.vito.ai/v1/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${process.env.RETURNZERO_CLIENT_ID}&client_secret=${process.env.RETURNZERO_CLIENT_SECRET}`,
  });

  const { access_token } = await response.json();
  console.log(access_token);

  const transcriptionResponse = await fetch(
    "https://openapi.vito.ai/v1/transcribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return NextResponse.json(transcriptionResponse);
}
