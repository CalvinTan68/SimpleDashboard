import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { createClient } from '../../../../lib/supabase/server';

// PUT - Update transaction
export async function PUT(request, { params }) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
        const body = await request.json();
        const { date, description, type, category, amount, fundSourceId } = body;

        // Check if transaction belongs to user
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId: user.id
            }
        });

        if (!existingTransaction) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
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

        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: {
                date: date ? new Date(date) : undefined,
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

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        return NextResponse.json(
            { error: 'Failed to update transaction' },
            { status: 500 }
        );
    }
}

// DELETE - Delete transaction
export async function DELETE(request, { params }) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;

        // Check if transaction belongs to user
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId: user.id
            }
        });

        if (!existingTransaction) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }

        await prisma.transaction.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return NextResponse.json(
            { error: 'Failed to delete transaction' },
            { status: 500 }
        );
    }
}