// app/api/transcripts/route.js
import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

export async function POST(request) {
  try {
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    });

    // const audioUrl = "https://t1.daumcdn.net/cfile/tistory/155667134C5A464171";
    // const audioUrl = "https://t1.daumcdn.net/cfile/tistory/195F9B134C5A462F3D";
    // const audioUrl = "https://clova.ai//speech/media/sample_ytn.mp3";
    const audioUrl = "https://clova.ai/speech/media/media_sample.mp3";

    const config = {
      audio_url: audioUrl,
      language_code: "ko",
    };
    const transcript = await client.transcripts.transcribe(config);
    return NextResponse.json(transcript);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
