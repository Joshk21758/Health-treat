"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "../actions/userAuth";

const initialState = {
  errors: {},
};

const roles = [
  "Manager",
  "Clinical Officer",
  "Medical Officer",
  "Receptionist",
  "Nurse",
];

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, initialState);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8 mt-28">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-green-900/90 shadow-2xl shadow-black/30 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-cyan-600 to-teal-800 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">
            New Life Medical
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Create an Administrator account
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-cyan-50/90 sm:text-base">
            Register a secure administrator profile to manage appointments and
            clinic operations.
          </p>
        </div>

        <div className="flex-1 p-8 sm:p-10">
          <form action={action} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Full name
              </label>
              <input
                name="fullName"
                type="text"
                className="w-full rounded-xl border border-teal-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
                placeholder="Enter full name"
              />
              {state?.errors?.fullName ?
                <p className="mt-2 text-sm text-red-500 ml-2">
                  {state.errors.fullName}
                </p>
              : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Role
              </label>
              <select
                name="role"
                className="w-full rounded-3xl border border-green-500 bg-slate-50 px-5 py-4 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="w-full rounded-xl border border-teal-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
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
                className="w-full rounded-xl border border-teal-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
                placeholder="Create a password"
              />
              {state?.errors?.password ?
                <p className="mt-2 text-sm text-red-500 ml-2">
                  {state.errors.password}
                </p>
              : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Confirm password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="w-full rounded-xl border border-teal-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
                placeholder="Re-enter your password"
              />
              {state?.errors?.confirmPassword ?
                <p className="mt-2 text-sm text-red-500 ml-2">
                  {state.errors.confirmPassword}
                </p>
              : null}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {pending ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/admin/login"
              className="font-medium text-green-400 hover:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
