import {
  approveAppointment,
  rescheduleAppointment,
} from "../../../actions/bookings";
import { getCollection } from "../../../lib/db";
import Link from "next/link";

export default async function AdminDashboard({ searchParams }) {
  const sortBy = searchParams?.sortBy || "submitted";
  const sortOrder = searchParams?.sortOrder === "desc" ? "desc" : "asc";

  // get appointments collection
  const appointmentsCollection = await getCollection("appointments");
  const appointments = await appointmentsCollection.find().toArray();

  const sortedAppointments = [...appointments].sort((a, b) => {
    const normalizeValue = (appointment) => {
      if (sortBy === "submitted") {
        return appointment.createdAt ?
            new Date(appointment.createdAt).getTime()
          : appointment._id.getTimestamp().getTime();
      }

      return (appointment[sortBy] ?? "").toString().toLowerCase();
    };

    const aValue = normalizeValue(a);
    const bValue = normalizeValue(b);

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const buildSortLink = (field) => {
    const nextOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    const selected = sortBy === field;

    return (
      <Link
        href={`/admin/dashboard?sortBy=${field}&sortOrder=${nextOrder}`}
        className={`inline-flex items-center gap-2 text-sm font-semibold transition ${selected ? "text-gray-100" : "text-white hover:text-green-600"}`}
      >
        {field === "submitted" ?
          "Submitted"
        : field === "fullName" ?
          "Patient"
        : field === "service" ?
          "Service"
        : field === "prefDate" ?
          "Date"
        : field}
        <span className="text-xs uppercase tracking-[0.24em]">
          {selected ?
            sortOrder === "asc" ?
              "↑"
            : "↓"
          : "⇅"}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2 mt-5">
            Administrators Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Track and manage patient records and appointments.
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {buildSortLink("fullName")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    {buildSortLink("service")}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    {buildSortLink("prefDate")}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Preferred Time
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    {buildSortLink("submitted")}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedAppointments.length > 0 ?
                  sortedAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-neutral-900">
                          {appointment.fullName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment.phoneNumber}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment.service}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment.prefDate}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment.prefTime}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment.message}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {appointment._id.getTimestamp().toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          <form action={approveAppointment}>
                            <input
                              type="hidden"
                              name="postId"
                              value={appointment._id.toString()}
                            />
                            <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                              Approve
                            </button>
                          </form>
                          <form action={rescheduleAppointment}>
                            <input
                              type="hidden"
                              name="postId"
                              value={appointment._id.toString()}
                            />
                            <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-500 hover:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                              Reschedule
                            </button>
                          </form>
                          <Link
                            href={`/appointments/show/${appointment._id.toString()}`}
                            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-500 hover:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            View details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                : <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      <p className="text-3xl">No Appointments available.</p>
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
