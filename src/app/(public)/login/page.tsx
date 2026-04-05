"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { supabaseClient } from "@/lib/persistence/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = supabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_35%),linear-gradient(180deg,#020617_0%,#081120_100%)] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center">
        <AuthCard>
          <div className="space-y-8">
            <AuthHeader
              title="Welcome back"
              subtitle="Sign in to continue your NIRA experience."
            />

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}