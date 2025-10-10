import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const profile = await prisma.profile.findUnique({ where: { userId } })
    return NextResponse.json(profile ?? null)
  } catch (e: any) {
    return NextResponse.json({ error: 'DB error', detail: String(e?.message || e) }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await req.json()
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    })
    return NextResponse.json(profile)
  } catch (e: any) {
    return NextResponse.json({ error: 'DB error', detail: String(e?.message || e) }, { status: 500 })
  }
}

