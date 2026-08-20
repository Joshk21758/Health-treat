"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "../actions/userAuth";
import { Loader2 } from "lucide-react";

const initialState = {
  errors: {},
};

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8 mt-28">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-rose-900/90 shadow-2xl shadow-black/30 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-neutral-400 to-neutral-800 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">
            Med Care
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-cyan-50/90 sm:text-base">
            Sign in to manage appointments, patient requests, and daily clinic
            operations.
          </p>
        </div>

        <div className="flex-1 p-8 sm:p-10">
          <form action={action} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="w-full rounded-xl border border-white bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                placeholder="name@medlife.com"
              />
              {state?.errors?.email ?
                <p className="mt-2 text-sm text-red-500 ml-2">
                  {state.errors.email}
                </p>
              : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full rounded-xl border border-white bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                placeholder="Enter password"
              />
              {state?.errors?.password ?
                <p className="mt-2 text-sm text-red-500 ml-2">
                  {state.errors.password}
                </p>
              : null}
            </div>

            <button
              disabled={pending}
              className="w-full rounded-xl bg-gray-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer  items-center"
            >
              {pending ?
                <Loader2 color="white" className="w-5 h-5 animate-spin ml-47" />
              : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            New admin?{" "}
            <Link
              href="/admin/register"
              className="font-medium text-white hover:text-rose-500"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
