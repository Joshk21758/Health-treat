"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  createDutyShift,
  toggleEmergencyBlock,
  deleteDutyShift,
} from "../actions/dutyRoster";

const shiftTypes = [
  "Morning",
  "Afternoon",
  "Night",
  "Consultation",
  "Emergency",
];

export default function DutyRosterManager({ doctors, shifts }) {
  const [createState, createAction, createPending] = useActionState(
    createDutyShift,
    {
      errors: {},
    },
  );
  const [toggleState, toggleAction, togglePending] = useActionState(
    toggleEmergencyBlock,
    {
      success: false,
    },
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteDutyShift,
    {
      success: false,
    },
  );

  const router = useRouter();

  useEffect(() => {
    if (!createState) return;

    if (createState.success) {
      toast.success(createState.message || "Shift created successfully.");
      router.refresh();
    } else if (
      createState.errors &&
      Object.keys(createState.errors).length > 0
    ) {
      toast.error("Please fix the highlighted errors.");
    }
  }, [createState, router]);

  useEffect(() => {
    if (!toggleState) return;

    if (toggleState.success) {
      toast.success(toggleState.message || "Shift updated successfully.");
      router.refresh();
    } else if (toggleState.message) {
      toast.error(toggleState.message);
    }
  }, [toggleState, router]);

  useEffect(() => {
    if (!deleteState) return;

    if (deleteState.success) {
      toast.success(deleteState.message || "Shift deleted successfully.");
      router.refresh();
    } else if (deleteState.message) {
      toast.error(deleteState.message);
    }
  }, [deleteState, router]);

  const hasDoctors = Array.isArray(doctors) && doctors.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-600 mt-5">
              Duty Roster Manager
            </p>
            <h1 className="mt-3 text-3xl font-bold text-neutral-800">
              Doctor Schedule & Emergency Slot Blocker
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Configure doctor shifts, block emergency coverage, and monitor
              roster status from a single dashboard.
            </p>
          </div>
          <a
            href="/admin/dashboard"
            className="inline-flex items-center rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-green-900"
          >
            Back to Dashboard
          </a>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Create New Shift
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Add a new doctor duty schedule and optionally block emergency
                  slots for coverage planning.
                </p>
              </div>
            </div>

            <form action={createAction} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-neutral-700">
                    Doctor Name
                  </span>
                  {hasDoctors ?
                    <select
                      name="doctorName"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                      defaultValue={doctors[0]?.fullName ?? ""}
                    >
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.fullName}>
                          {doctor.fullName}
                          {doctor.specialization ?
                            ` — ${doctor.specialization}`
                          : ""}
                        </option>
                      ))}
                    </select>
                  : <input
                      type="text"
                      name="doctorName"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                      placeholder="Dr. Anne Mwangi"
                    />
                  }
                  {createState?.errors?.doctorName && (
                    <p className="text-sm text-red-500">
                      {createState.errors.doctorName}
                    </p>
                  )}
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-neutral-700">
                    Role
                  </span>
                  <input
                    type="text"
                    name="role"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                    placeholder="General Physician"
                  />
                  {createState?.errors?.role && (
                    <p className="text-sm text-red-500">
                      {createState.errors.role}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-neutral-700">
                    Date
                  </span>
                  <input
                    type="date"
                    name="date"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                  {createState?.errors?.date && (
                    <p className="text-sm text-red-500">
                      {createState.errors.date}
                    </p>
                  )}
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-neutral-700">
                    Start Time
                  </span>
                  <input
                    type="time"
                    name="startTime"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                  {createState?.errors?.startTime && (
                    <p className="text-sm text-red-500">
                      {createState.errors.startTime}
                    </p>
                  )}
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-neutral-700">
                    End Time
                  </span>
                  <input
                    type="time"
                    name="endTime"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                  {createState?.errors?.endTime && (
                    <p className="text-sm text-red-500">
                      {createState.errors.endTime}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-neutral-700">
                    Shift Type
                  </span>
                  <select
                    name="shiftType"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  >
                    {shiftTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {createState?.errors?.shiftType && (
                    <p className="text-sm text-red-500">
                      {createState.errors.shiftType}
                    </p>
                  )}
                </label>

                <label className="flex items-center gap-3 rounded-3xl border border-green-200 bg-green-50 px-4 py-3">
                  <input
                    type="checkbox"
                    name="isEmergencyBlocked"
                    className="h-5 w-5 rounded-md text-green-600"
                  />
                  <div>
                    <span className="block text-sm font-medium text-neutral-700">
                      Block Emergency Slot?
                    </span>
                    <p className="text-xs text-neutral-500">
                      Prevent this shift from being used for emergency coverage.
                    </p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={createPending}
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {createPending ? "Adding shift..." : "Add Shift"}
              </button>
            </form>
          </section>

          <section className="rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Current Roster
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  See scheduled shifts and emergency slot status at a glance.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {shifts.length === 0 ?
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-neutral-500">
                  No shifts scheduled yet.
                </div>
              : <div className="space-y-4">
                  {shifts.map((shift) => (
                    <div
                      key={shift._id}
                      className="rounded-3xl border border-green-200 p-4 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {shift.doctorName}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {shift.role}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-neutral-900">
                            {shift.date}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {shift.startTime} - {shift.endTime}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-3xl bg-green-50 px-4 py-3 text-sm text-slate-700">
                          <span className="font-semibold">Type:</span>{" "}
                          {shift.shiftType}
                        </div>
                        <div className="rounded-3xl bg-green-50 px-4 py-3 text-sm text-slate-700">
                          <span className="font-semibold">
                            Emergency Block:
                          </span>{" "}
                          {shift.isEmergencyBlocked ? "Yes" : "No"}
                        </div>
                        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          <span className="font-semibold">Created:</span>{" "}
                          {new Date(shift.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <form action={toggleAction} className="inline-flex">
                          <input
                            type="hidden"
                            name="shiftId"
                            value={shift._id.toString()}
                          />
                          <button
                            disabled={togglePending}
                            className="rounded-full bg-green-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                          >
                            {shift.isEmergencyBlocked ?
                              "Unblock Emergency"
                            : "Block Emergency"}
                          </button>
                        </form>
                        <form action={deleteAction} className="inline-flex">
                          <input
                            type="hidden"
                            name="shiftId"
                            value={shift._id.toString()}
                          />
                          <button
                            disabled={deletePending}
                            className="rounded-full bg-red-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                          >
                            Delete Shift
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
