"use server";

import { getCollection } from "../lib/db";
import { ConsultationSchema } from "../lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function submitConsultation(state, formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //Validate form data
  const validatedFields = ConsultationSchema.safeParse({
    chiefComplaints: formData.get("chiefComplaints"),
    diagnosis: formData.get("diagnosis"),
    prescription: formData.get("prescription"),
    labRequests: formData.get("labRequests"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { chiefComplaints, diagnosis, prescription, labRequests } =
    validatedFields.data;

  const consultationCollection = await getCollection("consultations");

  //save consultations to the database
  let savedConsultation;
  try {
    savedConsultation = await consultationCollection.insertOne({
      chiefComplaints: validatedFields.data.chiefComplaints,
      diagnosis: validatedFields.data.diagnosis,
      prescription: validatedFields.data.prescription,
      labRequests: validatedFields.data.labRequests,
    });
  } catch (error) {
    console.log("Failed to save consultation:", error);
  }

  //redirect
  revalidatePath("/admin/dashboard/consultations");
}
