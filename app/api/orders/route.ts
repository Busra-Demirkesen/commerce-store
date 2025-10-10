import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    if (!base) return NextResponse.json({ error: "API base missing" }, { status: 500 });

    const url = new URL(req.url);
    const incoming = url.searchParams;
    // Only forward backend‑supported filters to reduce 404s
    const params = new URLSearchParams();
    const userId = incoming.get("userId");
    const phone = incoming.get("phone");
    const isPaid = incoming.get("isPaid");
    if (userId) params.set("userId", userId);
    if (phone) params.set("phone", phone);
    if (isPaid) params.set("isPaid", isPaid);

    const path = params.toString() ? `${base}/orders?${params.toString()}` : `${base}/orders`;
    const res = await fetch(path, { method: "GET" });

    // Attempt JSON; if fails, try text passthrough
    const text = await res.text();
    let payload: any;
    try { payload = JSON.parse(text); } catch { payload = text || []; }
    return NextResponse.json(payload, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: "Orders proxy failed", detail: String(e) }, { status: 500 });
  }
}
