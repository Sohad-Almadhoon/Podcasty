import { getSupabaseAuth } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = (await getSupabaseAuth());
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        const session = data?.session;
        console.log(error, 'error');

        if (!error && session) {
            const userId = session.user.id;
            const { data: user, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('id', userId)
                .single();

            if (userError && userError.code === 'PGRST116') { // If user doesn't exist
                // Insert the user (upsert creates a new row or updates if it already exists)
                const { data, error: upsertError } = await supabase
                    .from('users')
                    .upsert({
                        id: userId,
                        username: session.user.user_metadata.full_name,
                        avatar_url: session.user.user_metadata.avatar_url,
                        email: session.user.email,
                    });

                if (upsertError) {
                    console.error('Error inserting/updating user:', upsertError);
                    return NextResponse.json({ error: upsertError.message }, { status: 500 });
                }
            }

            const forwardedHost = request.headers.get('x-forwarded-host');
            const isLocalEnv = process.env.NODE_ENV === 'development';

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }
    return NextResponse.redirect(`${origin}/login`);
}
