import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  UserCheck,
  UserX,
  Calendar,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { getCollection } from "../../../../lib/db";
import { deletePatientProfile } from "../../../../actions/patients";

export default async function PatientsPage() {
  // get appointments collection
  const patientsCollection = await getCollection("patients");
  const patients = await patientsCollection.find().toArray();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-15">
      <Link
        href="/admin/dashboard"
        className="text-teal-600 hover:text-green-700 text-sm font-medium "
      >
        ← Back to Dashboard
      </Link>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mt-5">
            <Users className="w-6 h-6 text-emerald-600" /> Patient Directory
          </h1>
          <p className="text-lg text-gray-500 mt-1">
            Manage registered accounts, guest profiles, and medical history
            access.
          </p>
        </div>

        <Link
          href="/admin/dashboard/patient-directory/new"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Register New Patient
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search patient by name, phone (+260...), or NRC ID..."
          className="w-full text-sm outline-none text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Data Mapping Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-900 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Patients Name *
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date of Birth
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Gender
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Blood group
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Medical conditions
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.length > 0 ?
                patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.fullName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {patient.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.dateOfBirth ?
                          new Date(patient.dateOfBirth).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.gender}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.bloodGroup}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.conditions}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <form action={deletePatientProfile}>
                        <input
                          type="hidden"
                          name="patientId"
                          defaultValue={patient._id.toString()}
                        />
                        <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-slate-500 hover:bg-red-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-neutral-800"
                  >
                    <p className="text-lg font-bold">
                      No Patient profiles Available.{" "}
                    </p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
