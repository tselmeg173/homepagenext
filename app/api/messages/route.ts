import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, message } = await req.json()
  
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Бүх талбарыг бөглөнө үү' }, { status: 400 })
  }

  const msg = await prisma.message.create({
    data: { name, email, message }
  })

  return NextResponse.json({ success: true, msg })
}

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(messages)
}