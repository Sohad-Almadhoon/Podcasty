"use server";
import { headers } from "next/headers";
import { getSupabaseAuth } from "./supabase";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {

    const origin = (await headers()).get('origin');
    const { data, error } = await (await getSupabaseAuth()).auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}`
        }
    });
    if (error) {
        console.log(error);
    } else {
        return redirect(data.url);
    }

}

export const signOut = async () => {
    const { error } = await (await getSupabaseAuth()).auth.signOut();
    if (error) {
        console.log(error);
    } else {
        return redirect('/login');
    }
}
