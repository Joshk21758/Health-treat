"use server";

import { cookies } from "next/headers";

import { SignJWT, jwtVerify } from "jose";

//check if secret key exists
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("Secret key is not set");
}

//encode secret key
const encodedKey = new TextEncoder().encode(secretKey);

//encrypt payload
async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

//decrypt session
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to decrypt session");
    return null;
  }

  //create session
}

export async function createSession(userId) {
  //create new date
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const sessionPayload = {
    userId: userId._id,
    role: userId.role,
    fullName: userId.fullName,
  };

  //encrypt session
  const session = await encrypt(sessionPayload);

  //create cookieStore
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}
