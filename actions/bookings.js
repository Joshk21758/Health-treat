"use server";

import { getCollection } from "../lib/db";
import { AppointmentFormSchema } from "../lib/schema";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

async function sendBrevoEmail({ to, subject, htmlContent, textContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY is not set. Appointment email was not sent.");
    return false;
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "Med Life Medical Centre",
        email: process.env.BREVO_SENDER_EMAIL || "no-reply@medlife.com",
      },
      to,
      subject,
      htmlContent,
      textContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo request failed (${response.status}): ${errorText}`);
  }

  return true;
}

// User appointment server action
export async function createAppointment(state, formData) {
  //Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const validatedFields = AppointmentFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    service: formData.get("service"),
    prefDate: formData.get("prefDate"),
    prefTime: formData.get("prefTime"),
    message: formData.get("message"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Save post instance to Db
  const appointmentsCollection = await getCollection("appointments");
  let post;
  try {
    post = await appointmentsCollection.insertOne({
      fullName: validatedFields.data.fullName,
      email: validatedFields.data.email,
      phoneNumber: validatedFields.data.phoneNumber,
      service: validatedFields.data.service,
      prefDate: validatedFields.data.prefDate,
      prefTime: validatedFields.data.prefTime,
      message: validatedFields.data.message,
    });
  } catch (error) {
    console.log(error);
  }

  // return a result for the client to consume (e.g. show a toast)
  return {
    success: true,
    message:
      "Appointment submitted successfully. A confirmation email will be sent shortly, Thank You.",
    appointmentId: post?.insertedId?.toHexString?.() || null,
  };
}

// Approve server action
export async function approveAppointment(formData) {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const postId = formData.get("postId");
  if (!postId) {
    return { success: false, message: "Missing appointment id." };
  }

  const appointmentsCollection = await getCollection("appointments");
  const appointment = await appointmentsCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  if (!appointment) {
    return { success: false, message: "Appointment not found." };
  }

  if (appointment.email) {
    try {
      await sendBrevoEmail({
        to: [
          { email: appointment.email, name: appointment.fullName || "Patient" },
        ],
        subject: "Your Med Life appointment has been approved",
        htmlContent: `
          <h2>Appointment approved</h2>
          <p>Hi ${appointment.fullName || "Patient"},</p>
          <p>Your appointment request with Med Life Medical Centre has been approved.</p>
          <p><strong>Service:</strong> ${appointment.service || "Not specified"}</p>
          <p><strong>Preferred date:</strong> ${appointment.prefDate || "To be confirmed"}</p>
          <p><strong>Preferred time:</strong> ${appointment.prefTime || "To be confirmed"}</p>
          <p>We will contact you shortly with the final confirmation.</p>
        `,
        textContent: `Hi ${appointment.fullName || "Patient"}, your appointment has been approved. We will contact you shortly with the final confirmation.`,
      });
    } catch (error) {
      console.error("Failed to send approval email:", error);
      return {
        success: true,
        message: "Appointment approved, but the email could not be sent.",
      };
    }
  }

  redirect("/admin/dashboard");
}

// Reschedule server action
export async function rescheduleAppointment(formData) {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const postId = formData.get("postId");
  const newDate = formData.get("newDate") || "To be confirmed";
  const newTime = formData.get("newTime") || "To be confirmed";

  if (!postId) {
    return { success: false, message: "Missing appointment id." };
  }

  const appointmentsCollection = await getCollection("appointments");
  const appointment = await appointmentsCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  if (!appointment) {
    return { success: false, message: "Appointment not found." };
  }

  if (appointment.email) {
    try {
      await sendBrevoEmail({
        to: [
          { email: appointment.email, name: appointment.fullName || "Patient" },
        ],
        subject: "Your Med Life appointment has been rescheduled",
        htmlContent: `
          <h2>Appointment rescheduled</h2>
          <p>Hi ${appointment.fullName || "Patient"},</p>
          <p>Your appointment with Med Life Medical Centre has been rescheduled.</p>
          <p><strong>New date:</strong> ${newDate}</p>
          <p><strong>New time:</strong> ${newTime}</p>
          <p>Please reply to this email if you need any assistance.</p>
        `,
        textContent: `Hi ${appointment.fullName || "Patient"}, your appointment has been rescheduled. New date: ${newDate}; New time: ${newTime}.`,
      });
    } catch (error) {
      console.error("Failed to send reschedule email:", error);
      return {
        success: true,
        message: "Appointment rescheduled, but the email could not be sent.",
      };
    }
  }

  redirect("/admin/dashboard");
}
