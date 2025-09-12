import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { createClient } from '../../../../lib/supabase/server'

export async function PUT(request, { params }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { name, type } = body

    const fundSource = await prisma.fundSource.update({
      where: { 
        id,
        userId: user.id 
      },
      data: { name, type }
    })

    return NextResponse.json(fundSource)
  } catch (error) {
    console.error('Error updating fund source:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    await prisma.fundSource.delete({
      where: { 
        id,
        userId: user.id 
      }
    })

    return NextResponse.json({ message: 'Fund source deleted successfully' })
  } catch (error) {
    console.error('Error deleting fund source:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}