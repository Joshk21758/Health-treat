"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createAppointment } from "../actions/bookings";
import { Loader2 } from "lucide-react";

const services = [
  "General Consultation",
  "Specialist Consultation",
  "Laboratory Services",
  "Dental Care",
  "Antenatal Care",
  "Family Planning",
  "Ultrasound Scan",
  "Reproductive Health",
  "Male Circumcision",
  "Pharmacy",
];

const initialState = {
  errors: {},
};

export default function AppointmentForm() {
  const [state, action, isPending] = useActionState(
    createAppointment,
    initialState,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Appointment submitted");
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors and try again.");
    }
  }, [state]);

  return (
    <>
      <Toaster position="bottom-left" />

      <div className="rounded-[2rem] border border-neutral-300 bg-white shadow-2xl shadow-slate-200/70 p-8 sm:p-10">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
            Appointment Booking
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
            Book your next visit
          </h2>
          <p className="mt-4 text-slate-600">
            Choose a service, pick a date and time, and share any details that
            will help us prepare for your visit.
          </p>
        </div>

        <form action={action} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-lg ml-1 font-medium text-slate-700">
                Full Name *
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your Names"
                className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg ml-1 font-medium text-slate-700">
                Email *
              </span>
              <input
                type="email"
                name="email"
                placeholder="your-email@gmail.com"
                className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg ml-1 font-medium text-slate-700">
                Phone Number *
              </span>
              <input
                type="text"
                name="phoneNumber"
                placeholder="077 1287 453"
                className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.phoneNumber && (
                <p className="text-sm mt-4 text-red-500">
                  {state.errors.phoneNumber}
                </p>
              )}
            </label>

            <label className="space-y-3">
              <span className="text-lg ml-1 font-medium text-slate-700">
                Select Service
              </span>
              <select
                name="service"
                className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-lg ml-1 font-medium text-slate-700">
                Preferred Date *
              </span>
              <input
                type="date"
                name="prefDate"
                placeholder="e.g., 11/08/2026"
                className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg ml-1 font-medium text-slate-700">
                Preferred Time *
              </span>
              <input
                type="time"
                name="prefTime"
                placeholder="e.g., 15:30 PM"
                className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </label>
          </div>

          <label className="space-y-3">
            <span className="text-lg ml-1 font-medium text-slate-700">
              Notes
            </span>
            <textarea
              name="message"
              rows={5}
              placeholder="Please share symptoms or anything else we should know."
              className="w-full rounded-2xl border border-gray-400 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
            {state?.errors?.message && (
              <p className="text-sm mt-4 text-red-500">
                {state.errors.message}
              </p>
            )}
          </label>

          <button
            disabled={isPending}
            className="w-full rounded-full bg-neutral-800 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-teal-600/20 transition hover:bg-rose-500 cursor-pointer disabled:opacity-60"
          >
            {isPending ?
              <Loader2 color="white" className="w-5 h-5 animate-spin ml-115" />
            : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </>
  );
}
