"use server";

import { getCollection } from "../lib/db";
import { FeedBackFormSchema } from "../lib/schema";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

// Feedback server action
export async function createFeedback(state, formData) {
  //Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = FeedBackFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Save feedback instance to Db
  const feedbackCollection = await getCollection("feedbacks");
  let feedback;
  try {
    feedback = await feedbackCollection.insertOne({
      fullName: validatedFields.data.fullName,
      email: validatedFields.data.email,
      message: validatedFields.data.message,
      userId: new ObjectId(),
    });
  } catch (error) {
    console.log(error);
  }

  //redirect
  redirect("/");
}
