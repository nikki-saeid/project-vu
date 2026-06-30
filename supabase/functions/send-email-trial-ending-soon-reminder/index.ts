import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
    try {
        // Initialize Supabase Client with admin/service role privileges
        const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

        // Get date
        const createdSense = new Date();
        // Add 2 weeks and subtract 3 months natively
        createdSense.setDate(createdSense.getDate() + 14);
        createdSense.setMonth(createdSense.getMonth() - 3);

        // Fetch data
        const { data: usersToEmail, error: dbError } = await supabaseClient
            .from('businesses')
            .select(
                `
                id,
                created_at,
                name,
                email,
                subscriptions (
                    id
                )
            `,
            )
            .or('is_trial_email_reminder_sent.eq.false,is_trial_email_reminder_sent.is.null')
            .lte('created_at', createdSense.toISOString());

        if (dbError) throw dbError;

        // -------
        const targetedUsers = usersToEmail?.filter((business) => business.subscriptions.length === 0) ?? [];

        // -------
        const BASE_URL = Deno.env.get('NEXT_PUBLIC_BASE_URL');
        const API_URL = BASE_URL + '/api/email/trial-end-soon-reminder';

        // -------
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                users: targetedUsers,
            }),
        });

        // -------
        if (!response.ok) {
            throw new Error(`Backend API returned status code ${response.status}`);
        }

        // -------
        return new Response(JSON.stringify({ message: 'email sent', count: targetedUsers.length }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});
