"use server";

import { getCollection } from "../lib/db";
import { DutyShiftSchema } from "../lib/schema";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createDutyShift(state, formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const validated = DutyShiftSchema.safeParse({
    doctorName: formData.get("doctorName"),
    role: formData.get("role"),
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    shiftType: formData.get("shiftType"),
    isEmergencyBlocked: formData.get("isEmergencyBlocked") === "on",
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const rosterCollection = await getCollection("dutyRoster");
  await rosterCollection.insertOne({
    ...validated.data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    message: "Shift created successfully.",
  };
}

export async function toggleEmergencyBlock(formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const shiftId = formData.get("shiftId");
  if (!shiftId) {
    return { success: false, message: "Missing shift ID." };
  }

  const rosterCollection = await getCollection("dutyRoster");
  const shift = await rosterCollection.findOne({
    _id: ObjectId.createFromHexString(shiftId),
  });

  if (!shift) {
    return { success: false, message: "Shift not found." };
  }

  await rosterCollection.updateOne(
    { _id: shift._id },
    {
      $set: {
        isEmergencyBlocked: !shift.isEmergencyBlocked,
        updatedAt: new Date(),
      },
    },
  );

  return {
    success: true,
    message:
      shift.isEmergencyBlocked ?
        "Emergency block removed."
      : "Emergency slot blocked.",
  };
}

export async function deleteDutyShift(formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const shiftId = formData.get("shiftId");
  if (!shiftId) {
    return { success: false, message: "Missing shift ID." };
  }

  const rosterCollection = await getCollection("dutyRoster");
  await rosterCollection.deleteOne({
    _id: ObjectId.createFromHexString(shiftId),
  });

  return {
    success: true,
    message: "Shift deleted successfully.",
  };
}
