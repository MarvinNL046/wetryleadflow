import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// AES-256-GCM encryption for secure token storage
// Key must be 32 bytes (256 bits) for AES-256

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // 128 bits
const AUTH_TAG_LENGTH = 16; // 128 bits

function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error(
      "ENCRYPTION_KEY environment variable is not set. " +
      "Generate one with: openssl rand -hex 32"
    );
  }

  // Key should be 64 hex characters (32 bytes)
  if (key.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY must be 64 hex characters (32 bytes). " +
      "Generate one with: openssl rand -hex 32"
    );
  }

  return Buffer.from(key, "hex");
}

/**
 * Encrypt a string using AES-256-GCM
 * Returns: base64 encoded string in format: iv:authTag:ciphertext
 */
export function encrypt(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag();

  // Combine iv + authTag + ciphertext, separated by colons
  return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted}`;
}

/**
 * Decrypt a string that was encrypted with encrypt()
 */
export function decrypt(encrypted: string): string {
  const key = getEncryptionKey();

  const parts = encrypted.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted data format");
  }

  const [ivBase64, authTagBase64, ciphertext] = parts;

  const iv = Buffer.from(ivBase64, "base64");
  const authTag = Buffer.from(authTagBase64, "base64");

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Encrypt an access token for storage
 * This is a convenience wrapper that adds additional validation
 */
export function encryptToken(token: string): string {
  if (!token || token.length === 0) {
    throw new Error("Token cannot be empty");
  }
  return encrypt(token);
}

/**
 * Decrypt a stored access token
 */
export function decryptToken(encryptedToken: string): string {
  if (!encryptedToken || encryptedToken.length === 0) {
    throw new Error("Encrypted token cannot be empty");
  }
  return decrypt(encryptedToken);
}

/**
 * Generate a new encryption key (for setup/rotation)
 * This is a utility function - the actual key should be stored in env vars
 */
export function generateEncryptionKey(): string {
  return randomBytes(32).toString("hex");
}
