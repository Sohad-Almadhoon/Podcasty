import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export default async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message });
        }

        if (!data) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
