import { getCollection } from "../../../../lib/db";
import PatientDirectory from "../../../../components/PatientDirectory";

export default async function PatientDirectoryPage() {
  const patientCollection = await getCollection("patients");
  const patients = await patientCollection
    .find()
    .sort({ fullName: 1 })
    .toArray();

  return (
    <PatientDirectory
      patients={patients.map((patient) => ({
        _id: patient._id.toString(),
        fullName: patient.fullName,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        emergencyContactName: patient.emergencyContactName,
      }))}
    />
  );
}
