'use server';

import { GoogleGenAI } from "@google/genai";
import { callSheets } from "@/app/sheets/backend";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

//define server function
export async function generateResponse(input: string) {
  'use server'

  const response = await ai.models.generateContent({
    model: "gemini-3-flash",
    contents: `${input}`,
  });
  console.log(response.text);

  return response.text;
}

// function callSheets(): string {

// }


export async function matchKeywords(userInput: string) {
  'use server'

    // const jsonSchema = z.toJSONSchema(resourceSchema);
  // Download resource spreadsheet
  const entireSpreadsheet: string = await callSheets();

  const followupoptions = {
    1: "Can you please provide more details about the issue you're facing?",
    2: "Could you specify which department or service you're trying to access?",
    3: "Are you looking for information on a specific resource or just general guidance?",
    4: "Can you tell me if this is an urgent matter or if it can wait?",
    5: "Is there a particular time frame you're working with for this issue?",
    6: "Do you prefer on-campus resources, or off-campus as well?",
  };

  const resourceSchema = {
    type: "OBJECT",
    properties: {
      status: {
        type: "STRING",
        enum: ["MATCH_FOUND", "NEEDS_CLARIFICATION"],
        description: "Whether a resource was found or more info is needed."
      },
      follow_up_question: {
        type: "INTEGER",
        description: "The specific question to ask the user if status is NEEDS_CLARIFICATION",
        nullable: true,
      },
      match: {
        type: "OBJECT",
        nullable: true,
        properties: {
          resource_name: { type: "STRING" },
          resource_location: { type: "STRING" },
          contact_info: { type: "STRING" },
          schedule_link: { type: "STRING" },
          category: { type: "STRING" }
        }
      }
    },
    required: ["status"],
  };

  const keyword = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `The following is the user's input to our application: ${userInput}
    
    Please match the user input with a category from the following spreadsheet: ${entireSpreadsheet} OR ask a clarifying question to better understand the user's needs by providing the user with the above follow-up options to choose from ${followupoptions}. Return either the best-fit category or the clarifying question with the options.

    Finally, return the recommended category in the format of: Academic, Financial, Student Life, Wellbeing/Health/Safety, Parking and Transportation, Information Technology, or Campus Bookstore
    `,
  });

  console.log(keyword.text);
  console.log(keyword.candidates);
  console.log(keyword.promptFeedback);

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    User Input: ${userInput}
    Spreadsheet Context: ${entireSpreadsheet}
    Suggested Category: ${keyword.text}

    Instructions:
    1. If the input is clear, find the best resource and set status to 'MATCH_FOUND'.
    2. If the input is vague, set status to 'NEEDS_CLARIFICATION' and select the most appropriate ID (1-6) from the following options:
    ${JSON.stringify(followupoptions, null, 2)}
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
    return match;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
}