"use client";

import { useActionState } from "react";
import { createFeedback } from "../actions/feedback";

const initialState = {
  errors: {},
};

export default function FeedBackForm() {
  const [state, formAction, isPending] = useActionState(
    createFeedback,
    initialState,
  );

  return (
    <div className="rounded-[2rem] border border-slate-300 bg-white shadow-2xl shadow-slate-200/70 p-8 sm:p-10">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-rose-400">
          Share your thoughts about your experience with our services.
        </span>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-3">
            <span className="text-sm font-medium text-slate-700">
              Full Name *
            </span>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Names"
              className="w-full rounded-3xl border border-slate-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </label>

          <label className="space-y-3">
            <span className="text-sm font-medium text-slate-700">Email *</span>
            <input
              type="email"
              name="email"
              placeholder="your-email@gmail.com"
              className="w-full rounded-3xl border border-slate-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </label>
        </div>

        <label className="space-y-3">
          <span className="text-sm font-medium text-slate-700">Notes</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Share your thoughts..."
            className="w-full rounded-3xl border border-slate-500 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
          {state?.errors?.message && (
            <p className="text-sm mt-4 text-red-700">{state.errors.message}</p>
          )}
        </label>

        <button className="w-full rounded-full bg-neutral-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-teal-600/20 transition hover:bg-rose-500 cursor-pointer">
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
