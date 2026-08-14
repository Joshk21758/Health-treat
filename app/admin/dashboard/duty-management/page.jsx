import { getCollection } from "../../../../lib/db";
import DutyRosterManager from "../../../../components/DutyRosterManager";

export default async function DutyManagementPage() {
  const rosterCollection = await getCollection("dutyRoster");
  const doctorsCollection = await getCollection("doctors");

  const [shifts, doctors] = await Promise.all([
    rosterCollection.find().sort({ date: 1, startTime: 1 }).toArray(),
    doctorsCollection.find().toArray(),
  ]);

  return (
    <DutyRosterManager
      shifts={shifts.map((shift) => ({
        _id: shift._id.toString(),
        doctorName: shift.doctorName,
        role: shift.role,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
        shiftType: shift.shiftType,
        isEmergencyBlocked: !!shift.isEmergencyBlocked,
        createdAt: shift.createdAt?.toISOString(),
      }))}
      doctors={doctors.map((doctor) => ({
        _id: doctor._id.toString(),
        fullName: doctor.fullName,
        specialization: doctor.specialization ?? "",
      }))}
    />
  );
}
