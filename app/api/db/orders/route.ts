import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()
    console.log("API DB Orders GET: userId received", userId);
    if (!userId) {
      console.log("API DB Orders GET: Unauthorized - userId is null or undefined.");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log("API DB Orders GET: Fetching orders for userId", userId);
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })
    console.log("API DB Orders GET: Orders fetched successfully. Count:", orders.length);
    return NextResponse.json(orders)
  } catch (e: any) {
    console.error("API DB Orders GET Error:", e);
    return NextResponse.json({ error: 'DB error', detail: String(e?.message || e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const items: Array<{ product: any; quantity: number }> = body?.items || []
    const total: number = Number(body?.total || 0)
    const email: string | undefined = body?.email
    const phone: string | undefined = body?.phone
    const address: string | undefined = body?.address

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 })
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
    })

    return NextResponse.json(order, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: 'DB error', detail: String(e?.message || e) }, { status: 500 })
  }
}

