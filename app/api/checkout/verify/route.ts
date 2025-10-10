import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = process.env.STRIPE_SECRET_KEY || "";
    if (!secret) return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });

    const stripe = new Stripe(secret);

    const body = await req.json();
    const sessionId: string | undefined = body?.sessionId || body?.session_id;
    const items: Array<{ product: any; quantity: number }>|undefined = body?.items;
    const total: number | undefined = typeof body?.total === 'number' ? body.total : undefined;
    const email: string | undefined = body?.email;
    const phone: string | undefined = body?.phone;
    const address: string | undefined = body?.address;

    if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "items required" }, { status: 400 });
    }
    if (typeof total !== 'number') {
      return NextResponse.json({ error: "total required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = (session.payment_status === 'paid') || (session.status === 'complete');
    if (!paid) {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        email,
        phone,
        address,
        total,
        items: {
          create: items.map((l) => ({
            productId: String(l.product?.id ?? ''),
            productName: String(l.product?.name ?? 'Item'),
            price: Number(l.product?.price ?? 0),
            imageUrl: String(l.product?.images?.[0]?.url ?? ''),
            quantity: Number(l.quantity ?? 1),
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ ok: true, orderId: order.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: "Verify failed", detail: String(e?.message || e) }, { status: 500 });
  }
}
export const runtime = 'nodejs';
