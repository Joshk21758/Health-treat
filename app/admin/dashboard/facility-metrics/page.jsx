import { getCollection } from "../../../../lib/db";
import Link from "next/link";
import FacilityMetricsExport from "../../../../components/FacilityMetricsExport";

function getServiceStats(appointments) {
  const counts = {};
  for (const appointment of appointments) {
    const service = appointment.service?.trim() || "Unspecified";
    counts[service] = (counts[service] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([service, count]) => ({ service, count }));
}

function normalizeDate(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export default async function FacilityMetricsPage() {
  const appointmentsCollection = await getCollection("appointments");
  const appointments = await appointmentsCollection.find().toArray();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayKey = todayStart.getTime();

  const totalBookingsToday = appointments.filter((appointment) => {
    const createdAt =
      appointment.createdAt ?
        normalizeDate(appointment.createdAt)
      : normalizeDate(appointment._id.getTimestamp());
    return createdAt === todayKey;
  }).length;

  const completedConsultations = appointments.filter((appointment) => {
    const statusMatch = appointment.status === "approved";
    const serviceMatch = appointment.service
      ?.toLowerCase()
      .includes("consultation");
    return statusMatch || serviceMatch;
  }).length;

  const topServices = getServiceStats(appointments);
  const maxServiceCount = topServices.length > 0 ? topServices[0].count : 1;
  const metrics = {
    completedConsultations,
    totalBookingsToday,
    totalAppointments: appointments.length,
  };

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-600">
              Facility Metrics
            </p>
            <h1 className="mt-3 text-3xl font-bold text-neutral-900">
              Clinic performance at a glance
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-2xl">
              View completed consultations, daily booking volume, and the most
              requested services.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center rounded-full bg-neutral-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-green-800"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
              Completed consultations
            </p>
            <p className="mt-5 text-5xl font-bold text-neutral-900">
              {completedConsultations}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Total appointments that are marked as approved or consultation
              requests.
            </p>
          </div>
          <div className="rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
              Bookings today
            </p>
            <p className="mt-5 text-5xl font-bold text-neutral-900">
              {totalBookingsToday}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Appointments created since the start of today.
            </p>
          </div>
          <div className="rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
              Service demand
            </p>
            <p className="mt-5 text-5xl font-bold text-slate-900">
              {appointments.length}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Total bookings tracked across all services.
            </p>
          </div>
        </div>

        <div className="mt-4 sm:flex sm:justify-end">
          <FacilityMetricsExport metrics={metrics} topServices={topServices} />
        </div>

        <section className="mt-10 rounded-3xl bg-green-100 p-6 shadow-lg shadow-slate-200/70">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Top requested services
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Most popular services based on appointment requests.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {topServices.length === 0 ?
              <p className="text-sm text-neutral-500">
                No service data available yet.
              </p>
            : topServices.map((item) => (
                <div key={item.service} className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-neutral-900">
                      {item.service}
                    </p>
                    <span className="text-sm font-semibold text-neutral-700">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-green-100">
                    <div
                      className="h-full rounded-full bg-green-600 transition-all duration-300"
                      style={{
                        width: `${(item.count / maxServiceCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  );
}
