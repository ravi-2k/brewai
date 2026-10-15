import { getGemini, getTextModel } from "../config/gemini.js";

/**
 * Shared call to Gemini. Returns the reply as trimmed text.
 * `config` lets callers add options (like JSON mode) on top of the system instruction.
 * `file` ({ buffer, mimeType }) attaches a PDF or image for the model to read.
 */
const runModel = async ({ systemInstruction, prompt, file, config = {} }) => {
  // Plain text is just a string. With a file, the request is a list of "parts":
  // the file (base64-encoded bytes) followed by the text instruction.
  const contents = file
    ? [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: file.mimeType, data: file.buffer.toString("base64") } },
            { text: prompt },
          ],
        },
      ]
    : prompt;

  const response = await getGemini().models.generateContent({
    model: getTextModel(),
    contents,
    config: { systemInstruction, ...config },
  });

  const text = response.text?.trim();
  if (!text) throw new Error("The AI returned an empty response");

  return text;
};

/**
 * Free-form text reply (used by Write Article).
 *  - systemInstruction: standing rules for the model (role, output format)
 *  - prompt: the actual request for this call
 *
 * Kept separate from controllers on purpose: controllers deal with HTTP,
 * this deals with the AI provider, so switching provider means editing only this file.
 */
export const generateText = ({ systemInstruction, prompt }) =>
  runModel({ systemInstruction, prompt });

/**
 * Structured reply: the model must answer with JSON matching `schema`
 * (a standard JSON Schema), and we return it already parsed.
 *
 * Much safer than asking for "a list" in plain text and splitting the reply
 * on newlines or commas, which breaks as soon as the model words things differently.
 */
export const generateJSON = async ({ systemInstruction, prompt, schema, file }) => {
  const text = await runModel({
    systemInstruction,
    prompt,
    file,
    config: { responseMimeType: "application/json", responseJsonSchema: schema },
  });

  // The schema makes valid JSON very likely, not guaranteed, so never skip this try/catch.
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("The AI returned invalid JSON");
  }
};
