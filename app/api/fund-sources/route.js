import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fundSources = await prisma.fundSource.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(fundSources)
  } catch (error) {
    console.error('Error fetching fund sources:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, type } = body

    const fundSource = await prisma.fundSource.create({
      data: {
        name,
        type,
        userId: user.id
      }
    })

    return NextResponse.json(fundSource, { status: 201 })
  } catch (error) {
    console.error('Error creating fund source:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}