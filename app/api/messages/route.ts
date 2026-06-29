import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Бүх талбарыг бөглөнө үү' }, { status: 400 })
  }

  // Database-д хадгална
  const msg = await prisma.message.create({
    data: { name, email, message }
  })

  // Чиний email рүү илгээнэ
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.MY_EMAIL!,
    subject: `Шинэ мэссэж: ${name}`,
    html: `
      <h2>Шинэ мэссэж ирлээ!</h2>
      <p><strong>Нэр:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Мэссэж:</strong> ${message}</p>
    `
  })

  return NextResponse.json({ success: true, msg })
}

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(messages)
}