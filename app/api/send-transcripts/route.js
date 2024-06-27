import { NextResponse } from "next/server";

export async function POST(request) {
  const { audio_url } = await request.json();

  const response = await fetch(process.env.PDF_GEN_URL + "/transcripts", {
    method: "POST",
    body: JSON.stringify({ audio_url: audio_url }),
  });

  if (!response.ok) {
    return NextResponse.error();
  }

  try {
    return new Response(response.body);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
