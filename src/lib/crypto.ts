/**
 * Token Encryption Utilities
 * Uses AES-256-GCM for encrypting sensitive tokens at rest
 */

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Get the encryption key from environment
 * Supports both hex (64 chars) and base64 (44 chars) formats
 * Generate with: openssl rand -hex 32
 */
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }

  // Detect format: hex is 64 chars, base64 is ~44 chars
  let keyBuffer: Buffer;
  if (key.length === 64 && /^[0-9a-fA-F]+$/.test(key)) {
    // Hex format
    keyBuffer = Buffer.from(key, "hex");
  } else {
    // Base64 format
    keyBuffer = Buffer.from(key, "base64");
  }

  if (keyBuffer.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be a 32-byte key (64 hex chars or base64 encoded)");
  }

  return keyBuffer;
}

/**
 * Encrypt a token for storage
 * Returns a string in format: iv:authTag:ciphertext (all base64)
 */
export function encryptToken(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:ciphertext
  return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted}`;
}

/**
 * Decrypt a token from storage
 * Expects format: iv:authTag:ciphertext (all base64)
 */
export function decryptToken(encrypted: string): string {
  const key = getEncryptionKey();

  const parts = encrypted.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted token format");
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
 * Generate a new encryption key (for initial setup)
 * Run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
 */
export function generateEncryptionKey(): string {
  return randomBytes(32).toString("base64");
}
