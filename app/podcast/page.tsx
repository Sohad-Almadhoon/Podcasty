"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

const Podcasts = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function fetchSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setSession(session);
      }
    }

    fetchSession();
  }, []);

  return (
    <div>
      <h1>Podcasts</h1>
      {session ? (
        <div>
          <p>Session details:</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading session...</p>
      )}
    </div>
  );
};

export default Podcasts;
