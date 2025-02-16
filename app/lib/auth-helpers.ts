import { User } from "../types";
import supabase from "./supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
interface SaveUserResponse {
    success: boolean;
    error?: string;
}

export async function saveUserToDatabase(user: User): Promise<SaveUserResponse> {
    try {
        const { data, error } = await supabase
            .from("users") 
            .upsert([{
                id: user.id,
                email: user.email,
                username: user.username,
                avatar_url: user.avatar_url,
            }]); 

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("Error saving user:", error);
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}
export async function getUserServer() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session || !session.user) return null;

    const user = session.user;
    return {
        id: user.id,
        avatar_url: user.user_metadata.avatar_url,
        email: user.user_metadata.email,
        username: user.user_metadata.full_name,
    };
}