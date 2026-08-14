import Link from "next/link";

export default function AppointmentCard({ appointment }) {
  if (!appointment) {
    return null;
  }

  const formatValue = (value, fallback = "Not provided") => {
    if (value === undefined || value === null || value === "") {
      return fallback;
    }
    return value;
  };

  return (
    <div className="w-full max-w-4xl rounded-[2rem] border border-green-200 bg-white p-8 shadow-xl shadow-slate-200/80 sm:p-10">
      <div className="flex flex-col gap-4 border-b border-green-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-800">
            Appointment request
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {formatValue(appointment.fullName, "Patient")}
          </h1>
          <p className="mt-2 text-slate-600">
            Review the booking details and patient notes below.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-green-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-800">
            Contact details
          </p>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>
              <span className="block text-sm font-medium text-slate-500">
                Email
              </span>
              <span className="mt-1 block">
                {formatValue(appointment.email, "Not provided")}
              </span>
            </li>
            <li>
              <span className="block text-sm font-medium text-slate-500">
                Phone number
              </span>
              <span className="mt-1 block">
                {formatValue(appointment.phoneNumber, "Not provided")}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-green-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-800">
            Appointment info
          </p>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>
              <span className="block text-sm font-medium text-slate-500">
                Service
              </span>
              <span className="mt-1 block">
                {formatValue(appointment.service, "Not specified")}
              </span>
            </li>
            <li>
              <span className="block text-sm font-medium text-slate-500">
                Preferred date
              </span>
              <span className="mt-1 block">
                {formatValue(appointment.prefDate, "Not specified")}
              </span>
            </li>
            <li>
              <span className="block text-sm font-medium text-slate-500">
                Preferred time
              </span>
              <span className="mt-1 block">
                {formatValue(appointment.prefTime, "Not specified")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Patient notes
        </p>
        <p className="mt-3 whitespace-pre-line text-slate-700">
          {formatValue(
            appointment.message,
            "No additional notes were provided.",
          )}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/dashboard"
          className="rounded-full bg-teal-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Back to appointments
        </Link>
      </div>
    </div>
  );
}
