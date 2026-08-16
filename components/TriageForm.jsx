"use client";

import { submitNurseTriage } from "@/app/actions/triageActions";

export default function TriageForm({ encounterId, staffId }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const rawData = {
      triagedByStaffId: staffId,
      vitals: {
        bpSystolic: Number(formData.get("bpSystolic")),
        bpDiastolic: Number(formData.get("bpDiastolic")),
        temperature: Number(formData.get("temperature")),
        pulseRate: Number(formData.get("pulseRate")),
        weightKg: Number(formData.get("weightKg")),
        spO2: formData.get("spO2") ? Number(formData.get("spO2")) : undefined,
      },
      priorityLevel: formData.get("priorityLevel"),
    };

    await submitNurseTriage(encounterId, rawData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="bpSystolic"
          type="number"
          placeholder="BP Systolic (120)"
          required
        />
        <input
          name="bpDiastolic"
          type="number"
          placeholder="BP Diastolic (80)"
          required
        />
        <input
          name="temperature"
          type="number"
          step="0.1"
          placeholder="Temp (°C)"
          required
        />
        <input
          name="pulseRate"
          type="number"
          placeholder="Pulse (BPM)"
          required
        />
        <input
          name="weightKg"
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          required
        />
        <input name="spO2" type="number" placeholder="SpO2 % (Optional)" />
      </div>

      <select name="priorityLevel" defaultValue="ROUTINE">
        <option value="ROUTINE">Routine</option>
        <option value="URGENT">Urgent</option>
        <option value="EMERGENCY">Emergency</option>
      </select>

      <button
        type="submit"
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        Save Triage Vitals
      </button>
    </form>
  );
}
