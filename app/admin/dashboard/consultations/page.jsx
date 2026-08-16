import { getCollection } from "../../../../lib/db";
import { deleteConsultation } from "../../../../actions/consultations";
import Link from "next/link";

export default async function ConsultationsPage() {
  const consultationsCollection = await getCollection("consultations");
  const consultations = await consultationsCollection.find().toArray();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/admin/dashboard"
          className="text-teal-600 hover:text-green-700 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-4xl font-bold mt-6 text-neutral-700 mb-6">
            View and manage Consultations.
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Complaints *
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Diagnosis
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Prescription
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Lab requests
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {consultations.length > 0 ?
                  consultations.map((con) => (
                    <tr
                      key={con._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {con.chiefComplaint}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {con.diagnosis}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {con.prescription}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {con.labRequests}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <form action={deleteConsultation}>
                          <input
                            type="hidden"
                            name="consultId"
                            defaultValue={con._id.toString()}
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
                      colSpan="4"
                      className="px-6 py-8 text-center text-neutral-800"
                    >
                      <p className="text-lg font-bold">
                        No consultations yet.{" "}
                      </p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
