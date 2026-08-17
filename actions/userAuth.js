"use server";

import { getCollection } from "../lib/db";
import { LoginFormSchema, RegisterFormSchema } from "../lib/schema";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "../lib/sessions";
import { cookies } from "next/headers";

// register server actions
export async function register(state, formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //Validate form data
  const validatedFields = RegisterFormSchema.safeParse({
    fullName: formData.get("fullName"),
    role: formData.get("role"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { fullName, role, email, password } = validatedFields.data;

  //check if user collection exists
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        email: "User collection does not exist.",
      },
    };
  }

  //check if user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "User with this email already exists.",
      },
    };
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save user to the database
  let savedUser;
  try {
    savedUser = await userCollection.insertOne({
      fullName,
      role,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log("Failed to save user:", error);
  }

  //create a session
  await createSession({
    _id: savedUser.insertedId,
    role: role,
    fullName: fullName,
  });

  //redirect
  redirect("/admin/dashboard");
}

// login server action
export async function login(state, formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //Validate form data
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  // check if user collection exists
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        email: "User collection does not exist.",
      },
    };
  }

  // check if user exists
  const user = await userCollection.findOne({ email });
  if (!user) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // create a session
  await createSession({
    _id: user._id,
    role: user.role,
    fullName: user.fullName,
  });

  //redirect
  redirect("/admin/dashboard");
}

// logout server action
export async function logout(formData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //Clear the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  //Redirect
  redirect("/");
}
