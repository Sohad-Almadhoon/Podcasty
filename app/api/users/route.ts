import  supabase  from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, email, username, avatar_url } = req.body;

        try {
            const { data, error } = await supabase
                .from("users")
                .upsert(
                    {
                        id,
                        email,
                        username,
                        avatar_url,
                    },
                    { onConflict: "id" }
                );

            if (error) {
                throw new Error(error.message);
            }

            return res.status(200).json(data); 
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
