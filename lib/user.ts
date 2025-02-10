import supabase from "./supabase";

const getUserId = async () => {
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

        return user.id;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
};

export default getUserId;
