import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const newFormData = new FormData();
  newFormData.append("audio", formData.get("audio"), "recorded-audio.mp3");
  // const audioFile = await formData.get("audio").arrayBuffer();

  const response = await fetch(process.env.PDF_GEN_URL + "/upload-to-s3", {
    method: "POST",
    body: newFormData,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });

  if (!response.ok) {
    return NextResponse.error();
  }

  try {
    return new Response(response.body);
  } catch (error) {
    console.error("Error uploading audio to S3:", error);
    return NextResponse.json(
      { error: "Error uploading audio to S3" },
      { status: 500 }
    );
  }
}
