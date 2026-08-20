"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { submitPatientProfile } from "../actions/patients";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const initialState = {
  errors: {},
};

const bloods = ["A", "O", "B", "C"];

const genders = ["Male", "female"];

export default function PatientForm() {
  const [state, action, isPending] = useActionState(
    submitPatientProfile,
    initialState,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors and try again.");
    }
  }, [state]);

  return (
    <>
      <Toaster position="bottom-left" />

      <div className="rounded-[2rem] border border-neutral-300 bg-white shadow-2xl shadow-slate-200/70 p-8 sm:p-10">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="text-gray-600 hover:text-rose-600 text-sm font-medium mr-7"
          >
            ← Back to Dashboard
          </Link>
          <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-700">
            Patient Profile Management
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-rose-400 sm:text-4xl">
            Record Patient profiles
          </h2>
        </div>

        <form action={action} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-sm font-medium text-slate-700">
                Full Name *
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Patient's Full names"
                className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.fullName && (
                <p className="text-sm mt-4 text-red-500">
                  {state.errors.fullName}
                </p>
              )}
            </label>

            <label className="space-y-3">
              <span className="text-sm font-medium text-slate-700">
                Phone Number *
              </span>
              <input
                type="text"
                name="phone"
                placeholder="e.g., 077 1287 453"
                className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.phone && (
                <p className="text-sm mt-4 text-red-500">
                  {state.errors.phone}
                </p>
              )}
            </label>

            <label className="space-y-3">
              <span className="text-sm font-medium text-slate-700">
                Email *
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-sm font-medium text-slate-700">
                Date of Birth *
              </span>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Patient's DOB"
                className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="space-y-3">
              <span className="text-sm font-medium text-slate-700">
                Gender *
              </span>
              <select
                name="gender"
                className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-3">
              <span className="text-sm font-medium text-slate-700">
                Blood group *
              </span>
              <select
                name="bloodGroup"
                className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                {bloods.map((blood) => (
                  <option key={blood} value={blood}>
                    {blood}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-3">
            <span className="text-sm font-medium text-slate-700">Notes</span>
            <textarea
              name="conditions"
              rows={5}
              placeholder="Please indicate any medical conditions."
              className="w-full rounded-3xl border border-gray-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
            {state?.errors?.conditions && (
              <p className="text-sm mt-4 text-red-500">
                {state.errors.conditions}
              </p>
            )}
          </label>

          <button
            disabled={isPending}
            className="w-full rounded-full bg-neutral-800 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-teal-600/20 transition hover:bg-rose-600 cursor-pointer disabled:opacity-60 items-center"
          >
            {isPending ?
              <Loader2 color="white" className="w-5 h-5 animate-spin ml-47" />
            : "Create Profile"}
          </button>
        </form>
      </div>
    </>
  );
}
