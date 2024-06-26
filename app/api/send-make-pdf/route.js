import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  const response = await fetch("http://211.197.23.41/api/make-pdf?url=" + url);

  if (!response.ok) {
    return NextResponse.error();
  }

  try {
    return new Response(response.body);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
