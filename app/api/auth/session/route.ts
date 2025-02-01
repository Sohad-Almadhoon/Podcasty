import supabase from '@/lib/supabase'; 
import { NextApiRequest, NextApiResponse } from 'next';

interface SessionData {
    session: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data: { session } }: { data: SessionData } = await supabase.auth.getSession();

    if (session) {
        res.status(200).json(session); 
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
}
