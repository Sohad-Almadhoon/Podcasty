import supabase from "@/app/lib/supabase";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    try {
        const { error } = await supabase
            .from('podcasts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Podcast deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
