import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, avatar_url } = body;
        const { error } = await supabase
            .from("users")
            .insert({  email, username, avatar_url });

        if (error) throw error;

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
