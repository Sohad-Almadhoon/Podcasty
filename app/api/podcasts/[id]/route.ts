import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params; // Extract the podcast ID from the URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Get userId from query params (optional)

    try {
        let query;

        if (userId) {
            // If userId is provided, fetch all podcasts by the user except the one with the current id
            query = supabase
                .from("podcasts")
                .select("*")
                .eq("user_id", userId)
                .neq("id", id); // Exclude the current podcast
        } else {
            // If no userId is provided, fetch the podcast by its id
            query = supabase
                .from("podcasts")
                .select("*")
                .eq("id", id)
                .single(); // Ensure only one result is returned
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching podcast details:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
