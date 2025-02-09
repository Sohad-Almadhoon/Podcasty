import supabase from "./supabase";

const getUserId = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
        return user.id;
    } else {
        console.log("User not logged in", error);
        return null;
    }
};
export default getUserId;