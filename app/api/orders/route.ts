import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    if (!base) return NextResponse.json({ error: "API base missing" }, { status: 500 });

    const url = new URL(req.url);
    const qs = url.search ? url.search : "";
    // Forward query (e.g., userId, phone, isPaid, all) to backend
    const res = await fetch(`${base}/orders${qs}`, { method: "GET" });
    const data = await res.json().catch(() => ([]));
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: "Orders proxy failed", detail: String(e) }, { status: 500 });
  }
}
