import AppointmentCard from "../../../../components/AppointmentCard";
import { getCollection } from "../../../../lib/db";
import { ObjectId } from "mongodb";

export default async function ShowAppointment({ params }) {
  const { id } = await params;

  const applicationCollection = await getCollection("appointments");
  let appointment = null;

  if (id?.length === 24 && applicationCollection) {
    appointment = await applicationCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (appointment) {
      appointment = JSON.parse(JSON.stringify(appointment));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
            Appointment details
          </p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-neutral-700 sm:text-4xl">
            View booking information
          </h1>
        </div>

        {appointment ?
          <AppointmentCard appointment={appointment} />
        : <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/80">
            <h2 className="text-2xl font-semibold text-slate-900">
              Appointment not found
            </h2>
            <p className="mt-3 text-slate-600">
              The requested appointment could not be found. Please return and
              try again.
            </p>
          </div>
        }
      </div>
    </div>
  );
}
