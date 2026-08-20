"use client";

import { useActionState } from "react";
import { submitConsultation } from "../actions/consultations";

export default function ConsultationForm() {
  const [state, action, isPending] = useActionState(submitConsultation, {
    errors: {},
  });
  return (
    <form action={action} className="space-y-4">
      <input
        name="chiefComplaints"
        type="text"
        placeholder="Additional notes from chief staff"
      />
      {state?.errors?.chiefComplaints && (
        <p className="text-sm ml-3 mt-2 text-red-400">
          {state.errors.chiefComplaints}
        </p>
      )}
      <input name="diagnosis" type="text" placeholder="Diagnosis" />
      {state?.errors?.diagnosis && (
        <p className="text-sm ml-3 mt-2 text-red-400">
          {state.errors.diagnosis}
        </p>
      )}
      <input name="prescription" type="text" placeholder="Add prescriptions" />
      {state?.errors?.prescription && (
        <p className="text-sm ml-3 mt-2 text-red-400">
          {state.errors.prescription}
        </p>
      )}
      <input
        name="labRequests"
        type="text"
        placeholder="Labs (comma-separated, e.g. Malaria mRDT, FBC)"
      />
      {state?.errors?.labRequests && (
        <p className="text-sm ml-3 mt-2 text-red-400">
          {state.errors.labRequests}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-neutral-800 hover:bg-rose-400 text-white px-4 py-2 rounded"
      >
        {isPending ? "Submitting" : "Complete consultation"}
      </button>
    </form>
  );
}
