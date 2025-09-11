const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const userId = '6c105b3d-5be5-48c5-8b20-81207eaaa97c'
  
  console.log('Starting seed...')
  
  // Create fund sources
  const bankAccount = await prisma.fundSource.create({
    data: {
      userId,
      name: 'Main Checking Account',
      type: 'bank'
    }
  })
  
  const cashWallet = await prisma.fundSource.create({
    data: {
      userId,
      name: 'Cash Wallet',
      type: 'cash'
    }
  })
  
  const creditCard = await prisma.fundSource.create({
    data: {
      userId,
      name: 'Visa Credit Card',
      type: 'credit'
    }
  })
  
  const investment = await prisma.fundSource.create({
    data: {
      userId,
      name: 'Stock Portfolio',
      type: 'investment'
    }
  })
  
  console.log('Created fund sources:', { bankAccount, cashWallet, creditCard, investment })
  
  // Create transactions
  const transactions = await Promise.all([
    // Income transactions
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: bankAccount.id,
        date: new Date('2025-01-01'),
        description: 'January Salary',
        type: 'income',
        category: 'Salary',
        amount: 5000.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: bankAccount.id,
        date: new Date('2025-01-15'),
        description: 'Freelance Project Payment',
        type: 'income',
        category: 'Freelance',
        amount: 1500.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: investment.id,
        date: new Date('2025-01-20'),
        description: 'Dividend Payment',
        type: 'income',
        category: 'Investment',
        amount: 250.00
      }
    }),
    
    // Expense transactions
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: creditCard.id,
        date: new Date('2025-01-02'),
        description: 'Grocery Shopping',
        type: 'expense',
        category: 'Food',
        amount: 150.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: bankAccount.id,
        date: new Date('2025-01-03'),
        description: 'Rent Payment',
        type: 'expense',
        category: 'Housing',
        amount: 1200.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: cashWallet.id,
        date: new Date('2025-01-05'),
        description: 'Coffee Shop',
        type: 'expense',
        category: 'Entertainment',
        amount: 15.50
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: creditCard.id,
        date: new Date('2025-01-08'),
        description: 'Online Subscription',
        type: 'expense',
        category: 'Subscription',
        amount: 29.99
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: bankAccount.id,
        date: new Date('2025-01-10'),
        description: 'Utility Bills',
        type: 'expense',
        category: 'Utilities',
        amount: 200.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: cashWallet.id,
        date: new Date('2025-01-12'),
        description: 'Lunch',
        type: 'expense',
        category: 'Food',
        amount: 25.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: creditCard.id,
        date: new Date('2025-01-14'),
        description: 'Gas Station',
        type: 'expense',
        category: 'Transportation',
        amount: 60.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: bankAccount.id,
        date: new Date('2025-01-18'),
        description: 'Insurance Payment',
        type: 'expense',
        category: 'Insurance',
        amount: 300.00
      }
    }),
    prisma.transaction.create({
      data: {
        userId,
        fundSourceId: investment.id,
        date: new Date('2025-01-22'),
        description: 'Stock Purchase',
        type: 'expense',
        category: 'Investment',
        amount: 500.00
      }
    })
  ])
  
  console.log(`Created ${transactions.length} transactions`)
  
  // Calculate summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  
  console.log('\nSeed completed successfully!')
  console.log('Summary:')
  console.log(`- Fund Sources: 4`)
  console.log(`- Transactions: ${transactions.length}`)
  console.log(`- Total Income: $${totalIncome.toFixed(2)}`)
  console.log(`- Total Expenses: $${totalExpenses.toFixed(2)}`)
  console.log(`- Net: $${(totalIncome - totalExpenses).toFixed(2)}`)
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })