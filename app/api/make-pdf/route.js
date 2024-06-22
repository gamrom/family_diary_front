// app/api/pdf/route.js
import puppeteer from "puppeteer";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 페이지가 완전히 로드될 때까지 기다립니다.
    await page.goto(url, { waitUntil: "networkidle0" });

    // PDF 생성에 필요한 CSS 요소가 로드될 때까지 기다립니다.
    await page.waitForSelector('.pdf_wrapper', {
      timeout: 10000, // 10초 동안 기다립니다.
    });

    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    await browser.close();

    return new Response(pdf, {
      status: 200,
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
