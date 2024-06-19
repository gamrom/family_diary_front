// app/api/upload-to-s3/route.js
import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import fs from "fs";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = await formData.get("audio").arrayBuffer();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `recorded-audio-${Date.now()}.wav`,
      Body: Buffer.from(audioFile),
      ContentType: "audio/wav",
    };

    await s3.upload(params).promise();

    return NextResponse.json({ message: "Audio uploaded to S3 successfully" });
  } catch (error) {
    console.error("Error uploading audio to S3:", error);
    return NextResponse.json(
      { error: "Error uploading audio to S3" },
      { status: 500 }
    );
  }
}
