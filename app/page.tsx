"use client";
import { signInWithGoogle } from "@/lib/auth";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Website!</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
