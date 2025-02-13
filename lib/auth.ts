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

export const getUser = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
            console.error("No user found in session.");
            return null;
        }
        const user = session.user;
        if (!user) {
            console.error("No user found in session.");
            return null;
        }
        const userDetails = user.user_metadata;
        const {
            avatar_url,
            email,
            full_name, picture,
        } = userDetails;

        return {
            id: user.id,
            avatar_url,
            email,
            full_name,
            picture,
        };
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }

};
 
export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
}

