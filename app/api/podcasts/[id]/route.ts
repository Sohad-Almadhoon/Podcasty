import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params; // Extract the podcast ID from the URL

    try {
        // Query the database for a specific podcast by its ID
        const { data, error } = await supabase
            .from("podcasts")
            .select("*")
            .eq("id", id) // Only fetch the podcast with the specific ID
            .single(); // Ensure only one result is returned (since ID is unique)

        if (error) {
            throw error;
        }

        // Return the podcast data
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching podcast details:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
