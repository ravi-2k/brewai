import { GoogleGenAI } from "@google/genai";

let client;

/**
 * Returns the one shared Gemini client, creating it on first use.
 * Created lazily (not at import time) so the server can still start without a key,
 * and so a missing key produces a clear error only when an AI route is called.
 */
export const getGemini = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in server/.env");
  }
  client ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
};

// Model names change often, so it's overridable from .env without touching code.
// "gemini-flash-lite-latest" always points at the current Flash-Lite model. We use it
// by default because the regular Flash alias was often overloaded (503) and its
// free tier allows only 5 requests/minute.
export const getTextModel = () =>
  process.env.GEMINI_TEXT_MODEL || "gemini-flash-lite-latest";
