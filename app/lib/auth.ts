"use server";
import { getSupabaseAuth } from "./supabase";

export const signInWithGoogle = async () => {
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    try {
        const { data, error } = await (await getSupabaseAuth()).auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
            }
        });
        if (error) throw error;
        return { data, error: null };
    }
    catch (error) {
        return { error };
    }

}

export const signOut = async () => {
    try {
        const { error } = await (await getSupabaseAuth()).auth.signOut();
        if (error) throw error;
        return { error: null };
    }
    catch (error) {
        return { error };
    }
}
