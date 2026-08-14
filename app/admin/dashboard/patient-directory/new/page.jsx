"use client";

import { useActionState } from "react";
import { createPatientProfile } from "../../../../../actions/patients";
import Link from "next/link";

export default function NewPatientProfilePage() {
  const [state, formAction, isPending] = useActionState(createPatientProfile);
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-green-100 p-8 shadow-lg shadow-slate-200/70 mt-5">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-900">
              Add Patient Profile
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Capture basic patient details and medical history for care
              tracking.
            </p>
          </div>
          <Link
            href="/admin/dashboard/patient-directory"
            className="rounded-full bg-neutral-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Back
          </Link>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Full Name
              </span>
              <input
                type="text"
                name="fullName"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.fullName && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.fullName}
                </p>
              )}
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.email}
                </p>
              )}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Phone Number
              </span>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.phoneNumber && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.phoneNumber}
                </p>
              )}
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Date of Birth
              </span>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.dateOfBirth && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.dateOfBirth}
                </p>
              )}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Gender</span>
              <select
                name="gender"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Blood Group
              </span>
              <input
                type="text"
                name="bloodGroup"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                placeholder="A+ / B- / O+"
              />
              {state?.errors?.bloodGroup && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.bloodGroup}
                </p>
              )}
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Allergies
              </span>
              <input
                type="text"
                name="allergies"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                placeholder="Penicillin, pollen"
              />
              {state?.errors?.allergies && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.allergies}
                </p>
              )}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Existing Conditions
              </span>
              <textarea
                name="medicalConditions"
                rows={3}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.medicalConditions && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.medicalConditions}
                </p>
              )}
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Medications
              </span>
              <textarea
                name="medications"
                rows={3}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.medications && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.medications}
                </p>
              )}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Emergency Contact Name
              </span>
              <input
                type="text"
                name="emergencyContactName"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.emergencyContactName && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.emergencyContactName}
                </p>
              )}
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Emergency Contact Phone
              </span>
              <input
                type="tel"
                name="emergencyContactPhone"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {state?.errors?.emergencyContactPhone && (
                <p className="text-sm text-red-500 mt-3 ml-2">
                  {state.errors.emergencyContactPhone}
                </p>
              )}
            </label>
          </div>

          <button
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-neutral-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-green-700 cursor-pointer"
          >
            {isPending ? "Creating" : "Create profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
