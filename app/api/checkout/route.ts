import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productIds } = await req.json();
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: "productIds is required" }, { status: 400 });
    }

    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    if (!base) {
      return NextResponse.json({ error: "API base URL is not configured" }, { status: 500 });
    }

    const res = await fetch(`${base}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds }),
      // Important: server-side fetch, no CORS from browser
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: "Checkout proxy failed", detail: String(e) }, { status: 500 });
  }
}

