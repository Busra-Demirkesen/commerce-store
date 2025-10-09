import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productIds, email, phone, address, successUrl, cancelUrl } = await req.json();
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: "productIds is required" }, { status: 400 });
    }

    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    if (!base) {
      return NextResponse.json({ error: "API base URL is not configured" }, { status: 500 });
    }

    // Derive success/cancel URLs from request origin if not provided
    let derivedSuccess = successUrl;
    let derivedCancel = cancelUrl;
    try {
      const referer = req.headers.get("referer") || "";
      const origin = req.headers.get("origin") || (referer ? new URL(referer).origin : "");
      if (!derivedSuccess && origin) derivedSuccess = `${origin}/cart?success=1`;
      if (!derivedCancel && origin) derivedCancel = `${origin}/cart?canceled=1`;
    } catch {}

    const res = await fetch(`${base}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds, email, phone, address, successUrl: derivedSuccess, cancelUrl: derivedCancel }),
      // Important: server-side fetch, no CORS from browser
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ error: text || "Unknown backend response" }, { status: res.status });
    }
  } catch (e: any) {
    return NextResponse.json({ error: "Checkout proxy failed", detail: String(e) }, { status: 500 });
  }
}
