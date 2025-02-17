import { redirect } from "next/navigation";
import { createClient } from "./supabase";

export const signInWithGoogle = async () => {
    const supabase= await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/api/auth/callback',
        },
    })
    if (error) {
        console.error("Error signing in with Google:", error);
        return;
    }
    if (data.url) {
        redirect(data.url);
    }

}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
}
