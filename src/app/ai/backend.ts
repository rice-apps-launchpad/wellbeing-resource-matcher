'use server';

import {GoogleGenAI} from "@google/genai";
import {callSheets} from "@/app/sheets/backend";
import followups from "@/app/ai/followups.json";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


export type MatchResult = {
  status: "MATCH_FOUND" | "NEEDS_CLARIFICATION";
  follow_up_question?: string;
  match?: {
    resource_name: string;
    resource_location: string;
    contact_info: string;
    schedule_link: string;
    category: string;
  };
};

export async function matchKeywords(userInput: string, chatHistory: string[]): Promise<MatchResult> {
  'use server'

  // const jsonSchema = z.toJSONSchema(resourceSchema);
  // Download resource spreadsheet
  const entireSpreadsheet = await callSheets();

  console.log("chat history:" + chatHistory);



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
        description: "The ID of the specific question to ask the user if status is NEEDS_CLARIFICATION",
        nullable: true,
      },
      match: {
        type: "OBJECT",
        properties: {
          resource_name: { type: "STRING" },
          resource_location: { type: "STRING" },
          contact_info: { type: "STRING" },
          schedule_link: { type: "STRING" },
          category: { type: "STRING" },
          // temporary
          description: { type: "STRING" }
        }
      }
    },
    required: ["status"],
  };

  // const keyword = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: `The following is the user's input to our application: ${userInput}. The following is the previous chat history: ${chatHistory}
  //
  //   Please match the user input with a category from the following spreadsheet: ${entireSpreadsheet} OR ask a clarifying question to better understand the user's needs by providing the user with the above follow-up options to choose from ${followupoptions}. Return either the best-fit category or the clarifying question with the options.
  //
  //   Finally, return the recommended category in the format of: Academic, Financial, Student Life, Wellbeing/Health/Safety, Parking and Transportation, Information Technology, or Campus Bookstore
  //   `,
  // });

  // console.log(keyword.text);
  // console.log(keyword.candidates);
  // console.log(keyword.promptFeedback);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    Chat History: ${chatHistory}
    User Input: ${userInput}

    Instructions:
    You should try to match the user's needs to the best resource available at Rice University. 
    1. If there is a clear match, choose the best resource and set status to 'MATCH_FOUND'.
    2. If you think you need more details, set status to 'NEEDS_CLARIFICATION' and select the most appropriate ID (0–140) from the following options for follow-up questions:
    ${JSON.stringify(followups)}
    
    Don't be afraid to ask multiple follow up questions. Ideally, you want to ask at least three questions! Never ask a duplicate follow-up question.
    
    Here is the database of resources you can choose from:
    ${JSON.stringify(entireSpreadsheet)}
    `,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: resourceSchema,
    },
  });



  if (!response.text) {
    throw new Error("AI did not respond :(");
  }

  try {
    const responseJson = JSON.parse(response.text);
    console.log("Parsed Match:", responseJson);
    return responseJson;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    throw e;
  }
}