// app/api/transcripts/route.js
export const dynamic = "force-dynamic"; // defaults to auto
import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

export async function POST(request) {
  try {
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    });
    // const formData = await request.formData();
    // const audioUrl = formData.get("audio_url")
    // const { audio_url: audioUrl } = await request.body.json();

    const { audio_url } = await request.json();

    const config = {
      audio_url: audio_url,
      language_code: "ko",
    };

    const transcript = await client.transcripts.transcribe(config);
    return NextResponse.json(transcript);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
