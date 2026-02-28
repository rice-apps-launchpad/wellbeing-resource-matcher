'use server';

import { google } from 'googleapis';

interface Resource {
  title: string;
  descrip: string;
  image: string;
}

export async function callSheets(): Promise<Resource[]> {
  try {
    const sheets = google.sheets({
      version: 'v4', 
      auth: process.env.SHEETS_API_KEY 
    });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: '1lKEbI5yVq2QeK6s7N5ft2FPUTW435XykQ7Ags1QZ62E',
      range: 'On Campus Resources!A2:L', 
    });

    const vals = result.data.values;

    if (!vals || vals.length === 0) {
      console.log('No data found in the specified range.');
      return [];
    }

    return vals
      .map((row) => {
        const title = row[1];
        const website = row[2];
        const image = row[11];

        if (title && title.trim() !== "" && title !== "Resource Name") {
          return {
            title: title,
            descrip: website || "https://www.rice.edu",
            image: image 
          };
        }
        return null;
      })
      .filter((item): item is Resource => item !== null);

  } catch (error: any) {
    console.error('Google Sheets API Error:', error.message);
    return [];
  }
}