import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createClient } from '../../../lib/supabase/server';

// GET - Fetch all fund sources for user
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

        const fundSources = await prisma.fundSource.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(fundSources);
    } catch (error) {
        console.error('Error fetching fund sources:', error);
        return NextResponse.json(
            { error: 'Failed to fetch fund sources' },
            { status: 500 }
        );
    }
}

// POST - Create new fund source
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
        const { name, type } = body;

        if (!name || !type) {
            return NextResponse.json(
                { error: 'Name and type are required' },
                { status: 400 }
            );
        }

        const fundSource = await prisma.fundSource.create({
            data: {
                userId: user.id,
                name,
                type
            }
        });

        return NextResponse.json(fundSource, { status: 201 });
    } catch (error) {
        console.error('Error creating fund source:', error);
        return NextResponse.json(
            { error: 'Failed to create fund source' },
            { status: 500 }
        );
    }
}