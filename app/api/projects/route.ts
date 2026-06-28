import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const { title, description, tags, color } = await req.json()
  
  const project = await prisma.project.create({
    data: { title, description, tags, color }
  })

  return NextResponse.json({ success: true, project })
}