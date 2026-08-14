import Link from "next/link";
import AppointmentForm from "../../components/AppointmentForm";

export const metadata = {
  title: "Book an Appointment | New Life Medical Centre",
  description: "Schedule a medical appointment with New Life Medical Centre.",
};

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="text-teal-600 hover:text-green-700 text-sm font-medium"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Book an Appointment
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Use the form below to request a booking. We will review your details
            and contact you to confirm the appointment.
          </p>
        </div>
        <AppointmentForm />
      </div>
    </div>
  );
}
