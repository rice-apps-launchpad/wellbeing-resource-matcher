'use server';

import { GoogleGenAI } from "@google/genai";
import { string, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { callSheets } from "@/app/sheets/backend";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

//define server function
export async function generateResponse(input: string) {
  'use server'

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${input}`,
  });
  console.log(response.text);

  return response.text;
}

// function callSheets(): string {

// }

export async function matchKeywords(userInput: string) {
  'use server'

  const resourceSchema = {
    type: "OBJECT", // or SchemaType.OBJECT
    description: "A matched resource from the spreadsheet",
    properties: {
      resource_name: {
        type: "STRING", // or SchemaType.STRING
        description: "The name of the resource.",
        nullable: false,
      },
      resource_location: {
        type: "STRING",
        description: "The location of the resource.",
        nullable: false,
      },
      contact_info: {
        type: "STRING",
        description: "The contact information of the resource.",
        nullable: false,
      },
      schedule_link: {
        type: "STRING",
        description: "The link of the resource.",
        nullable: false,
      },
    },
    // 2. Explicitly list required fields
    required: ["resource_name", "resource_location", "contact_info", "schedule_link"],
  };

  // const jsonSchema = z.toJSONSchema(resourceSchema);
  // Download resource spreadsheet
  const entireSpreadsheet: string = await callSheets();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-09-2025",
    contents: `The following is the user's input to our application: ${userInput}
    
    Please match the user input with a resource from the following spreadsheet: ${entireSpreadsheet}
    `,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: resourceSchema,
    },
  });
  if (!response.text) {
    return "No response from AI";
  }

  try {
    const match = JSON.parse(response.text);
    console.log("Parsed Match:", match);
    return response.text;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
}

