import { getSupabaseAuth } from '@/app/lib/supabase';

import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await getSupabaseAuth();
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .select("*");

        if (error) {
            throw error;
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

}
