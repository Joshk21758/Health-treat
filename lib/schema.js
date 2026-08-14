import { z } from "zod";

// register form schema
export const RegisterFormSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Full name is required" }),
    email: z.string().trim().email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().trim(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// login form schema
export const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Appointment form schema
export const AppointmentFormSchema = z.object({
  fullName: z.string().trim(),
  email: z.string().trim(),
  phoneNumber: z.string().min(10, "Phone number must be 10 digits"),
  service: z.string(),
  prefDate: z.string().trim(),
  prefTime: z.string().trim(),
  message: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
});

export const DutyShiftSchema = z.object({
  doctorName: z.string().trim().min(2, "Doctor name is required"),
  role: z.string().trim().min(2, "Doctor role is required"),
  date: z.string().trim().min(1, "Date is required"),
  startTime: z.string().trim().min(1, "Start time is required"),
  endTime: z.string().trim().min(1, "End time is required"),
  shiftType: z.enum([
    "Morning",
    "Afternoon",
    "Night",
    "Consultation",
    "Emergency",
  ]),
  isEmergencyBlocked: z.boolean().optional(),
});

// Patient profile schema
export const PatientProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phoneNumber: z.string().trim().min(7, "Enter a valid phone number"),
  dateOfBirth: z.string().trim().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.string().trim(),
  allergies: z.string().trim().optional(),
  medicalConditions: z.string().trim().optional(),
  medications: z.string().trim().optional(),
  emergencyContactName: z.string().trim().optional(),
  emergencyContactPhone: z.string().trim().optional(),
});

// Feedback form Schema
export const FeedBackFormSchema = z.object({
  fullName: z.string().trim(),
  email: z.string(),
  message: z.string().trim().min(8, "Message must be atleast 8 characters"),
});
