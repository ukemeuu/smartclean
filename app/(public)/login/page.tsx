"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";

const emailPattern = /.+@.+\..+/;

type FormState = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialState: FormState = {
  email: "",
  password: "",
  rememberMe: true,
};

export default function LoginPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.email || !emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage bookings, track visits, and chat with your provider or concierge manager.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        {status === "success" ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Check your inbox</h2>
            <p className="text-sm text-slate-600">
              We sent a secure magic link to <span className="font-medium text-slate-900">{form.email}</span>. Use it to finish signing in.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setStatus("idle");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700"
            >
              Sign in with another email
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Email address</span>
                <div className="relative mt-1">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-9 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    autoComplete="email"
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </label>

              <label className="block text-sm">
                <span className="font-medium text-slate-700">Password</span>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, password: event.target.value }))
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    autoComplete="current-password"
                    required
                  />
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, rememberMe: event.target.checked }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  Keep me signed in on this device
                </label>
                <a href="#" className="text-brand-700 hover:text-brand-800">
                  Forgot password?
                </a>
              </div>
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
            >
              <LogIn size={16} />
              {status === "submitting" ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm text-slate-600">
              New to SmartClean? {" "}
              <Link href="/(public)/register" className="font-semibold text-brand-700 hover:text-brand-800">
                Create an account
              </Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
