import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { createClient } from '../../../../lib/supabase/server';

// PUT - Update fund source
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
        const { name, type } = body;

        // Check if fund source belongs to user
        const existingSource = await prisma.fundSource.findFirst({
            where: {
                id,
                userId: user.id
            }
        });

        if (!existingSource) {
            return NextResponse.json(
                { error: 'Fund source not found' },
                { status: 404 }
            );
        }

        const updatedSource = await prisma.fundSource.update({
            where: { id },
            data: { name, type }
        });

        return NextResponse.json(updatedSource);
    } catch (error) {
        console.error('Error updating fund source:', error);
        return NextResponse.json(
            { error: 'Failed to update fund source' },
            { status: 500 }
        );
    }
}

// DELETE - Delete fund source
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

        // Check if fund source belongs to user
        const existingSource = await prisma.fundSource.findFirst({
            where: {
                id,
                userId: user.id
            }
        });

        if (!existingSource) {
            return NextResponse.json(
                { error: 'Fund source not found' },
                { status: 404 }
            );
        }

        await prisma.fundSource.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Fund source deleted successfully' });
    } catch (error) {
        console.error('Error deleting fund source:', error);
        return NextResponse.json(
            { error: 'Failed to delete fund source' },
            { status: 500 }
        );
    }
}