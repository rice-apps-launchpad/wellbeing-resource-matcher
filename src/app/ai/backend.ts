'use server';

import { GoogleGenAI } from "@google/genai";
import { callSheets } from "@/app/sheets/backend";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

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

  // Download resource spreadsheet
  const entireSpreadsheet: string = await callSheets();

  const keyword = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-09-2025",
    contents: `The following is the user's input to our application: ${userInput}
    
    Please match the user input with a category from the following spreadsheet: ${entireSpreadsheet}

    Finally, return the recommended category in the format of: Academic, Financial, Student Life, Wellbeing/Health/Safety, Parking and Transportation, Information Technology, or Campus Bookstore
    `,
  });

  console.log(keyword.text);
  console.log(keyword.candidates);
  console.log(keyword.promptFeedback);


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-09-2025",
    contents: `The following is the user's input to our application: ${userInput}
    
    Please match the user input with a resource of the category ${keyword.text} from the following spreadsheet: ${entireSpreadsheet}

    Finally, return the recommended resource in the format of: [resource name] | [location] | [contact info] | [scheduling link]
    `,
  });
  console.log(response.text);
  console.log(response.candidates);
  console.log(response.promptFeedback);

  return response.text;
}

