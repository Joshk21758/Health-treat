"use server";

import { getCollection } from "../lib/db";
import { PatientSchema } from "../lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function submitPatientProfile(state, formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //Validate form data
  const validatedFields = PatientSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    bloodGroup: formData.get("bloodGroup"),
    conditions: formData.get("conditions"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const {
    fullName,
    phone,
    email,
    dateOfBirth,
    gender,
    bloodGroup,
    conditions,
  } = validatedFields.data;

  const patientCollection = await getCollection("patients");

  //save consultations to the database
  let savedPatient;
  try {
    savedPatient = await patientCollection.insertOne({
      fullName: validatedFields.data.fullName,
      phone: validatedFields.data.phone,
      email: validatedFields.data.email,
      dateOfBirth: validatedFields.data.dateOfBirth,
      gender: validatedFields.data.gender,
      bloodGroup: validatedFields.data.bloodGroup,
      conditions: validatedFields.data.conditions,
    });
  } catch (error) {
    console.log("Failed to save patient:", error);
  }

  // return a result for the client to consume (e.g. show a toast)
  return {
    success: true,
    message: "Patient profile created!",
  };
}

export async function deletePatientProfile(formData) {
  const patientId = formData.get("patientId");

  if (!patientId) {
    throw new Error("Patient ID is invalid");
  }

  //find profile to delete
  const patientsCollection = await getCollection("patients");
  const patient = await patientsCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("patientId")),
  });

  //Delete the post
  await patientsCollection.findOneAndDelete({ _id: patient._id });

  //revalidate path
  revalidatePath("/admin/dashboard/patient-directory");
}
