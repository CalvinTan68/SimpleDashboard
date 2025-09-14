import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createClient } from '../../../lib/supabase/server';

// GET - Fetch transactions with filters and pagination
export async function GET(request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const type = searchParams.get('type');
        const category = searchParams.get('category');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Build where clause
        const where = {
            userId: user.id
        };

        if (type) {
            where.type = type;
        }

        if (category) {
            where.category = category;
        }

        if (startDate || endDate) {
            where.date = {};
            if (startDate) {
                where.date.gte = new Date(startDate);
            }
            if (endDate) {
                where.date.lte = new Date(endDate);
            }
        }

        // Get total count for pagination
        const total = await prisma.transaction.count({ where });

        // Get paginated transactions
        const transactions = await prisma.transaction.findMany({
            where,
            include: {
                fundSource: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                }
            },
            orderBy: { date: 'desc' },
            skip: (page - 1) * limit,
            take: limit
        });

        return NextResponse.json({
            transactions,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}

// POST - Create new transaction
export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { date, description, type, category, amount, fundSourceId } = body;

        if (!date || !description || !type || !amount) {
            return NextResponse.json(
                { error: 'Date, description, type, and amount are required' },
                { status: 400 }
            );
        }

        // Validate fund source belongs to user if provided
        if (fundSourceId) {
            const fundSource = await prisma.fundSource.findFirst({
                where: {
                    id: fundSourceId,
                    userId: user.id
                }
            });

            if (!fundSource) {
                return NextResponse.json(
                    { error: 'Invalid fund source' },
                    { status: 400 }
                );
            }
        }

        const transaction = await prisma.transaction.create({
            data: {
                userId: user.id,
                date: new Date(date),
                description,
                type,
                category: category || null,
                amount,
                fundSourceId: fundSourceId || null
            },
            include: {
                fundSource: true
            }
        });

        return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json(
            { error: 'Failed to create transaction' },
            { status: 500 }
        );
    }
}