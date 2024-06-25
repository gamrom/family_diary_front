import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let browser;

  try {
    if (process.env.NODE_ENV === "development") {
      browser = await puppeteer.launch();
    } else {
      browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        // ignoreDefaultArgs: ["--disable-extensions"],
        headless: true,
        timeout: 60000,
        // env: {
        //   DISPLAY: ":99.0",
        // },
      });
    }
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    // await page.waitForSelector(".pdf_wrapper", {
    //   timeout: 10000, // 10초 동안 기다립니다.
    // });

    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    await browser.close();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `generated-pdf-${Date.now()}.pdf`,
      Body: pdf,
      ContentType: "application/pdf",
      ACL: "public-read",
    };

    const data = await s3.upload(params).promise();

    return NextResponse.json({
      ...data,
    });
  } catch (error) {
    console.error(error);
    if (browser) {
      await browser.close();
    }
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
