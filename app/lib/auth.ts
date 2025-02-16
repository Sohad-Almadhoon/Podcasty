import supabase from "./supabase";

export async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `http://localhost:3000/auth/callback`,
        },
    });

    if (error) {
        console.error("Google Sign-In Error:", error);
        return;
    }

    console.log("Redirecting to Google OAuth...");
}

export async function getUserClient() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    const user = session.user;
    console.log(session.user.user_metadata)
    return {
        id: user.id,
        avatar_url: user.user_metadata.avatar_url,
        email: user.user_metadata.email,
        username: user.user_metadata.full_name,
    };
}



export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
}
