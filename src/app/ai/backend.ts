'use server';

import {GoogleGenAI} from "@google/genai";
import {callSheetsWithRows} from "@/app/sheets/backend";
import followups from "@/app/ai/followups.json";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


export type MatchResult = {
  status: "MATCH_FOUND" | "NEEDS_CLARIFICATION";
  follow_up_question?: number;
  match?: {
    resource_row: number;
  };
  other_matches?: {
    resource_row: number;
  }[];
};

export async function matchKeywords(userInput: string, chatHistory: string[]): Promise<MatchResult> {
  'use server'

  // const jsonSchema = z.toJSONSchema(resourceSchema);
  // Download resource spreadsheet
  const entireSpreadsheet = await callSheetsWithRows();

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
        description: "Required when status is NEEDS_CLARIFICATION. Must be set to a valid ID (0–141) from the follow-up questions list. Do NOT omit this when status is NEEDS_CLARIFICATION.",
        nullable: true,
      },
      match: {
        type: "OBJECT",
        description: "Required when status is MATCH_FOUND. Must be set to the best matching resource.",
        properties: {
          resource_row: {type: "INTEGER"},
        }
      },
      other_matches: {
        type: "ARRAY",
        description: "Optional secondary matches. ONLY include this field when status is MATCH_FOUND and a primary match is set. Never populate other_matches without also setting match.",
        nullable: true,
        items: {
          type: "OBJECT",
          properties: {
            resource_row: {type: "INTEGER"},
          }
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
    You are a Rice University wellbeing resource matcher. Your only job is to help users find relevant Rice University resources.
    If the user says something unrelated (e.g. greetings, small talk), treat it as if they need help but haven't shared details yet — ask a clarifying question.
    You must ALWAYS return either a match or a follow_up_question. Never return a response with neither.
    1. If there is a clear match, set status to 'MATCH_FOUND', set match.resource_row to the row number from the database, and optionally include 1–3 other relevant resources in other_matches. Do not repeat the primary match in other_matches. Never set other_matches unless match is also set.
    2. Otherwise, set status to 'NEEDS_CLARIFICATION' and you MUST set follow_up_question to a valid ID (0–141) from the options below. Never leave follow_up_question unset when status is NEEDS_CLARIFICATION.
    2a. If someone shares anything with key words "suicide, self-harm, cutting, dying, death, killing," etc, you MUST respond with follow_up_question ID -1. There are no exceptions to this rule.  
    ${JSON.stringify(followups)}

    Don't be afraid to ask multiple follow up questions. Ideally, you want to ask **at least three questions**! Try to get the full picture before deciding on a match. Never ask a duplicate follow-up question.
    
    Choosing additional matches is important if a user has multiple explicit needs — for example, if they are dealing with stress that might stem from financial hardship, you might recommend a financial resource with an additional match being the wellbeing center.
    
    Users should primarily be matched to official Rice resources and student-run resources second.
    
    The Wellbeing Center is usually for shorter term anxiety / stress / interpersonal conflict, whereas the Rice University Counseling Center is for longer term hardship, persistent anxiety, or even psychiatric needs.   

    Here is the database of resources you can choose from. Each resource has a "row" field — use that as the resource_row value when you find a match:
    ${JSON.stringify(entireSpreadsheet)}
    `,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: resourceSchema,
    },
  });


  if (response.text == undefined) {
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