import { getCollection } from "../../../../../lib/db";
import Link from "next/link";
import { ObjectId } from "mongodb";

export default async function PatientProfilePage({ params }) {
  const patientCollection = await getCollection("patients");
  const patient = await patientCollection.findOne({
    _id: ObjectId.createFromHexString(params.id),
  });

  if (!patient) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/70 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Profile not found
          </h1>
          <p className="mt-3 text-slate-500">
            The requested patient profile could not be found.
          </p>
          <Link
            href="/admin/dashboard/patient-directory"
            className="mt-8 inline-flex rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-green-100 p-8 shadow-lg shadow-slate-200/70 mt-7">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-600">
              Medical Profile
            </p>
            <h1 className="mt-3 text-3xl font-bold text-neutral-900">
              {patient.fullName}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Detailed patient medical information and care notes.
            </p>
          </div>
          <Link
            href="/admin/dashboard/patient-directory"
            className="inline-flex items-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Back to Directory
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl bg-green-100 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Profile Summary
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {patient.email}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-neutral-500">Phone</p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {patient.phoneNumber}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-neutral-500">DOB</p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {patient.dateOfBirth}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-neutral-500">Gender</p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {patient.gender}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Blood Group
                </h3>
                <p className="mt-2 text-neutral-700">
                  {patient.bloodGroup || "Not recorded"}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Allergies
                </h3>
                <p className="mt-2 text-neutral-700">
                  {patient.allergies || "None reported"}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Medications
                </h3>
                <p className="mt-2 text-neutral-700">
                  {patient.medications || "None reported"}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Medical Conditions
                </h3>
                <p className="mt-2 text-neutral-700">
                  {patient.medicalConditions || "None reported"}
                </p>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">
                Emergency Contact
              </h3>
              <p className="mt-3 text-neutral-700">
                {patient.emergencyContactName || "Not provided"}
              </p>
              <p className="mt-1 text-neutral-500">
                {patient.emergencyContactPhone || "Not provided"}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">
                Record Notes
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                Add treatment notes or update patient status here later.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
