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
  
  // Helper function to generate random date in the last 6 months
  const getRandomDate = (monthsBack) => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1)
    const end = new Date(now.getFullYear(), now.getMonth() - monthsBack + 1, 0)
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  // Create sample transactions for the last 6 months
  const transactionData = [
    // Income transactions
    { fundSourceId: bankAccount.id, description: 'Monthly Salary - September', type: 'income', category: 'Salary', amount: 5000.00, monthsBack: 0 },
    { fundSourceId: bankAccount.id, description: 'Freelance Web Project', type: 'income', category: 'Freelance', amount: 1500.00, monthsBack: 0 },
    { fundSourceId: investment.id, description: 'Dividend Payment Q3', type: 'income', category: 'Investment', amount: 320.00, monthsBack: 0 },
    { fundSourceId: bankAccount.id, description: 'Monthly Salary - August', type: 'income', category: 'Salary', amount: 5000.00, monthsBack: 1 },
    { fundSourceId: bankAccount.id, description: 'Consulting Project', type: 'income', category: 'Freelance', amount: 2200.00, monthsBack: 1 },
    { fundSourceId: bankAccount.id, description: 'Monthly Salary - July', type: 'income', category: 'Salary', amount: 5000.00, monthsBack: 2 },
    { fundSourceId: investment.id, description: 'Stock Sale Profit', type: 'income', category: 'Investment', amount: 850.00, monthsBack: 2 },
    { fundSourceId: bankAccount.id, description: 'Monthly Salary - June', type: 'income', category: 'Salary', amount: 5000.00, monthsBack: 3 },
    { fundSourceId: cashWallet.id, description: 'Cash Gift', type: 'income', category: 'Gift', amount: 200.00, monthsBack: 3 },
    { fundSourceId: bankAccount.id, description: 'Monthly Salary - May', type: 'income', category: 'Salary', amount: 5000.00, monthsBack: 4 },
    { fundSourceId: bankAccount.id, description: 'Monthly Salary - April', type: 'income', category: 'Salary', amount: 5000.00, monthsBack: 5 },
    { fundSourceId: bankAccount.id, description: 'Tax Refund', type: 'income', category: 'Other', amount: 650.00, monthsBack: 5 },

    // Expense transactions
    { fundSourceId: creditCard.id, description: 'Whole Foods Groceries', type: 'expense', category: 'Food & Dining', amount: 185.50, monthsBack: 0 },
    { fundSourceId: bankAccount.id, description: 'Monthly Rent', type: 'expense', category: 'Bills & Utilities', amount: 1350.00, monthsBack: 0 },
    { fundSourceId: creditCard.id, description: 'Amazon Shopping', type: 'expense', category: 'Shopping', amount: 89.99, monthsBack: 0 },
    { fundSourceId: cashWallet.id, description: 'Coffee & Pastries', type: 'expense', category: 'Food & Dining', amount: 24.50, monthsBack: 0 },
    { fundSourceId: creditCard.id, description: 'Netflix & Spotify', type: 'expense', category: 'Entertainment', amount: 28.98, monthsBack: 0 },
    { fundSourceId: bankAccount.id, description: 'Electricity Bill', type: 'expense', category: 'Bills & Utilities', amount: 125.00, monthsBack: 0 },
    { fundSourceId: creditCard.id, description: 'Gas Station Fill-up', type: 'expense', category: 'Transportation', amount: 65.00, monthsBack: 0 },
    { fundSourceId: bankAccount.id, description: 'Health Insurance', type: 'expense', category: 'Health & Medical', amount: 285.00, monthsBack: 0 },
    { fundSourceId: creditCard.id, description: 'Restaurant Dinner', type: 'expense', category: 'Food & Dining', amount: 78.50, monthsBack: 0 },
    { fundSourceId: investment.id, description: 'Stock Purchase - AAPL', type: 'expense', category: 'Investment', amount: 500.00, monthsBack: 0 },

    { fundSourceId: creditCard.id, description: 'Grocery Shopping', type: 'expense', category: 'Food & Dining', amount: 165.75, monthsBack: 1 },
    { fundSourceId: bankAccount.id, description: 'Monthly Rent', type: 'expense', category: 'Bills & Utilities', amount: 1350.00, monthsBack: 1 },
    { fundSourceId: creditCard.id, description: 'Uber Rides', type: 'expense', category: 'Transportation', amount: 45.50, monthsBack: 1 },
    { fundSourceId: bankAccount.id, description: 'Internet Bill', type: 'expense', category: 'Bills & Utilities', amount: 89.99, monthsBack: 1 },
    { fundSourceId: creditCard.id, description: 'Movie Theater', type: 'expense', category: 'Entertainment', amount: 32.00, monthsBack: 1 },
    { fundSourceId: cashWallet.id, description: 'Food Truck Lunch', type: 'expense', category: 'Food & Dining', amount: 18.00, monthsBack: 1 },

    { fundSourceId: creditCard.id, description: 'Summer Clothes Shopping', type: 'expense', category: 'Shopping', amount: 225.00, monthsBack: 2 },
    { fundSourceId: bankAccount.id, description: 'Monthly Rent', type: 'expense', category: 'Bills & Utilities', amount: 1350.00, monthsBack: 2 },
    { fundSourceId: creditCard.id, description: 'Vacation Hotel', type: 'expense', category: 'Travel', amount: 450.00, monthsBack: 2 },
    { fundSourceId: creditCard.id, description: 'Flight Tickets', type: 'expense', category: 'Travel', amount: 380.00, monthsBack: 2 },
    { fundSourceId: cashWallet.id, description: 'Vacation Souvenirs', type: 'expense', category: 'Shopping', amount: 75.00, monthsBack: 2 },
    { fundSourceId: creditCard.id, description: 'Car Maintenance', type: 'expense', category: 'Transportation', amount: 320.00, monthsBack: 2 },

    { fundSourceId: bankAccount.id, description: 'Monthly Rent', type: 'expense', category: 'Bills & Utilities', amount: 1350.00, monthsBack: 3 },
    { fundSourceId: creditCard.id, description: 'Gym Membership', type: 'expense', category: 'Health & Medical', amount: 59.99, monthsBack: 3 },
    { fundSourceId: creditCard.id, description: 'Grocery Shopping', type: 'expense', category: 'Food & Dining', amount: 145.25, monthsBack: 3 },
    { fundSourceId: bankAccount.id, description: 'Phone Bill', type: 'expense', category: 'Bills & Utilities', amount: 95.00, monthsBack: 3 },

    { fundSourceId: bankAccount.id, description: 'Monthly Rent', type: 'expense', category: 'Bills & Utilities', amount: 1350.00, monthsBack: 4 },
    { fundSourceId: creditCard.id, description: 'Online Course', type: 'expense', category: 'Education', amount: 199.00, monthsBack: 4 },
    { fundSourceId: creditCard.id, description: 'Grocery Shopping', type: 'expense', category: 'Food & Dining', amount: 178.90, monthsBack: 4 },
    { fundSourceId: bankAccount.id, description: 'Car Insurance', type: 'expense', category: 'Insurance', amount: 165.00, monthsBack: 4 },

    { fundSourceId: bankAccount.id, description: 'Monthly Rent', type: 'expense', category: 'Bills & Utilities', amount: 1350.00, monthsBack: 5 },
    { fundSourceId: creditCard.id, description: 'Spring Wardrobe', type: 'expense', category: 'Shopping', amount: 285.50, monthsBack: 5 },
    { fundSourceId: bankAccount.id, description: 'Dental Checkup', type: 'expense', category: 'Health & Medical', amount: 150.00, monthsBack: 5 },
    { fundSourceId: creditCard.id, description: 'Birthday Party Expenses', type: 'expense', category: 'Entertainment', amount: 125.00, monthsBack: 5 }
  ]

  // Create transactions with realistic dates
  const transactions = await Promise.all(
    transactionData.map(data => {
      return prisma.transaction.create({
        data: {
          userId,
          fundSourceId: data.fundSourceId,
          date: getRandomDate(data.monthsBack),
          description: data.description,
          type: data.type,
          category: data.category,
          amount: data.amount
        }
      })
    })
  )
  
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