"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { deletePatientProfile } from "../actions/patients";

export default function PatientDirectory({ patients }) {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("All");

  const bloodGroups = useMemo(() => {
    const groups = new Set(
      patients.map((patient) => patient.bloodGroup || "Other"),
    );
    return ["All", ...Array.from(groups).sort()];
  }, [patients]);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const normalizedSearch = search.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch === "" ||
        patient.fullName.toLowerCase().includes(normalizedSearch) ||
        patient.email.toLowerCase().includes(normalizedSearch) ||
        patient.phoneNumber.toLowerCase().includes(normalizedSearch);

      const matchesGender =
        genderFilter === "All" || patient.gender === genderFilter;

      const groupValue = patient.bloodGroup || "Other";
      const matchesBloodGroup =
        bloodGroupFilter === "All" || groupValue === bloodGroupFilter;

      return matchesSearch && matchesGender && matchesBloodGroup;
    });
  }, [patients, search, genderFilter, bloodGroupFilter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-600 mt-5">
              Patient Directory
            </p>
            <h1 className="mt-3 text-3xl font-bold text-neutral-800">
              Medical Profiles
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Browse registered patients and quickly filter by name, gender, or
              blood group.
            </p>
          </div>
          <Link
            href="/admin/dashboard/patient-directory/new"
            className="inline-flex items-center rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-green-700"
          >
            Add New Profile
          </Link>
        </div>

        <div className="mb-6 grid gap-4 rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70 sm:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, or phone"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Gender</span>
            <select
              value={genderFilter}
              onChange={(event) => setGenderFilter(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Blood Group
            </span>
            <select
              value={bloodGroupFilter}
              onChange={(event) => setBloodGroupFilter(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
            >
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    DOB / Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-green-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-neutral-900">
                        {patient.fullName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {patient.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-700">
                        {patient.phoneNumber}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {patient.emergencyContactName || "-"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-700">
                        {patient.dateOfBirth}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {patient.gender}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      {patient.bloodGroup || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/admin/dashboard/patient-directory/${patient._id}`}
                        className="rounded-full bg-teal-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-green-700"
                      >
                        View
                      </Link>
                      <form className="inline" action={deletePatientProfile}>
                        <input
                          type="hidden"
                          name="patientId"
                          value={patient._id}
                        />
                        <button
                          type="submit"
                          className="rounded-full bg-red-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-500 cursor-pointer"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-neutral-600"
                    >
                      No profiles match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
