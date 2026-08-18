import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "rabelo_session";

export type SessionRole = "ADMIN" | "EDITOR";

export interface SessionUser {
  id: string;
  email: string;
  role: SessionRole;
}

function getSessionSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters long");
  }

  return new TextEncoder().encode(secret);
}

function isSessionRole(role: unknown): role is SessionRole {
  return role === "ADMIN" || role === "EDITOR";
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  const claims = {
    email: user.email,
    role: user.role,
  };

  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSessionSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecretKey(), {
      algorithms: ["HS256"],
    });
    const id = typeof payload.sub === "string" ? payload.sub : null;
    const email = typeof payload.email === "string" ? payload.email : null;
    const role = isSessionRole(payload.role) ? payload.role : null;

    if (!id || !email || !role) {
      return null;
    }

    return {
      id,
      email,
      role,
    };
  } catch {
    return null;
  }
}
