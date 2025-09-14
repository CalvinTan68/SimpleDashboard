import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { createClient } from '../../../../lib/supabase/server'

export async function GET(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current date and first day of current month
    const now = new Date()
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const currentYear = new Date(now.getFullYear(), 0, 1)

    // Get all user's transactions
    const allTransactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      select: {
        type: true,
        amount: true,
        date: true
      }
    })

    // Get monthly transactions
    const monthlyTransactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: currentMonth
        }
      },
      select: {
        type: true,
        amount: true,
        date: true
      }
    })

    // Calculate statistics
    const stats = {
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      yearlyIncome: 0,
      yearlyExpenses: 0,
      totalTransactions: allTransactions.length,
      fundSourcesCount: 0
    }

    // Calculate totals
    allTransactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount)
      if (transaction.type === 'income') {
        stats.totalBalance += amount
      } else {
        stats.totalBalance -= amount
      }
    })

    // Calculate monthly stats
    monthlyTransactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount)
      if (transaction.type === 'income') {
        stats.monthlyIncome += amount
      } else {
        stats.monthlyExpenses += amount
      }
    })

    // Calculate yearly stats
    allTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date)
      if (transactionDate >= currentYear) {
        const amount = parseFloat(transaction.amount)
        if (transaction.type === 'income') {
          stats.yearlyIncome += amount
        } else {
          stats.yearlyExpenses += amount
        }
      }
    })

    // Get fund sources count
    const fundSourcesCount = await prisma.fundSource.count({
      where: { userId: user.id }
    })
    stats.fundSourcesCount = fundSourcesCount

    // Get recent transactions for chart data
    const recentTransactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 10,
      select: {
        id: true,
        date: true,
        description: true,
        type: true,
        amount: true,
        fundSource: {
          select: {
            name: true
          }
        }
      }
    })

    // Get monthly chart data for the last 6 months
    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59)

      const monthTransactions = await prisma.transaction.findMany({
        where: {
          userId: user.id,
          date: {
            gte: monthStart,
            lte: monthEnd
          }
        },
        select: {
          type: true,
          amount: true
        }
      })

      let income = 0
      let expenses = 0

      monthTransactions.forEach(t => {
        const amount = parseFloat(t.amount)
        if (t.type === 'income') {
          income += amount
        } else {
          expenses += amount
        }
      })

      monthlyData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        income,
        expenses
      })
    }

    return NextResponse.json({
      ...stats,
      recentTransactions,
      monthlyChart: monthlyData
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}