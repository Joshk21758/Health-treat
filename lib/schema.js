import { z } from "zod";

// register form schema
export const RegisterFormSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Full name is required" }),
    role: z.string(),
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

export const PatientSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  dateOfBirth: z.coerce.date(),
  gender: z.string(),
  bloodGroup: z.string().trim(),
  conditions: z
    .string()
    .min(3, "Medical condition must be at least 3 characters"),
});

export const ConsultationSchema = z.object({
  chiefComplaints: z.string().min(1, "Chief complaint is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  prescription: z.string().min(3, "Prescription must be atleast 4 characters"),
  labRequests: z.string().min(5, "Request must be atleast 5 characters"),
});

// Feedback form Schema
export const FeedBackFormSchema = z.object({
  fullName: z.string().trim(),
  email: z.string(),
  message: z.string().trim().min(8, "Message must be atleast 8 characters"),
});
