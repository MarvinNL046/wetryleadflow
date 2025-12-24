/**
 * OpenAI Agents SDK Client
 *
 * The OpenAI Agents SDK uses the OPENAI_API_KEY environment variable automatically.
 * This module provides utilities for checking configuration.
 */

/**
 * Check if the OpenAI API is configured and available.
 */
export function isAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

/**
 * Validate that the API key is present.
 * @throws Error if OPENAI_API_KEY is not configured
 */
export function requireAIConfig(): void {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not configured. Please add it to your environment variables."
    );
  }
}
