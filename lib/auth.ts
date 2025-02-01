import supabase from "@/lib/supabase";

export async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    });

    if (error) {
        console.error("Google Sign-In Error:", error);
        return;
    }
    console.log("Redirecting to Google OAuth...");
}

export async function getUserSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) return null;
    return data.session.user;
}

export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
}

