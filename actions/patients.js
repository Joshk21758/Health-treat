"use server";

import { revalidatePath } from "next/cache";
import { getCollection } from "../lib/db";
import { PatientProfileSchema } from "../lib/schema";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPatientProfile(state, formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const validated = PatientProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    bloodGroup: formData.get("bloodGroup"),
    allergies: formData.get("allergies"),
    medicalConditions: formData.get("medicalConditions"),
    medications: formData.get("medications"),
    emergencyContactName: formData.get("emergencyContactName"),
    emergencyContactNumber: formData.get("emergencyContactNumber"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const patientCollection = await getCollection("patients");
  await patientCollection.insertOne({
    ...validated.data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  redirect("/admin/dashboard");
}

export async function deletePatientProfile(formData) {
  const patientId = formData.get("patientId");
  if (!patientId) {
    return { success: false, message: "Missing patient ID." };
  }

  const patientCollection = await getCollection("patients");
  await patientCollection.deleteOne({
    _id: ObjectId.createFromHexString(patientId),
  });

  revalidatePath("/admin/dashboard/patient-directory");
}
