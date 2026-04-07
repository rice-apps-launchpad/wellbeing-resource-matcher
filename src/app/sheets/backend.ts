'use server';

import { google } from 'googleapis';

const SPREADSHEET_ID = '1lKEbI5yVq2QeK6s7N5ft2FPUTW435XykQ7Ags1QZ62E';

interface Resource {
  title: string;
  descrip: string;
  image: string;
}

export interface FullResource {
  row: number; // The spreadsheet row number (2-indexed, since row 1 is the header)
  category: string;
  resourceName: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  description: string;
  schedulingLink: string;
  issueKey: string;
  keywords: string;
  faqLink: string;
  image: string;
}

function getSheets() {
  return google.sheets({
    version: 'v4',
    auth: process.env.SHEETS_API_KEY
  });
}

/**
 * Returns all resources with row numbers, used by the AI for matching.
 */
export async function callSheetsWithRows(): Promise<FullResource[]> {
  try {
    const sheets = getSheets();

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'On Campus Resources!A2:L',
    });

    const vals = result.data.values;

    if (!vals || vals.length === 0) {
      console.log('No data found in the specified range.');
      return [];
    }

    return vals
      .map((row, index) => {
        const title = row[1];
        if (!title || title.trim() === "" || title === "Resource Name") {
          return null;
        }
        return {
          row: index + 2, // +2 because data starts at row 2 (row 1 is header)
          category: row[0] || "",
          resourceName: title,
          website: row[2] || "",
          contactEmail: row[3] || "",
          contactPhone: row[4] || "",
          location: row[5] || "",
          description: row[6] || "",
          schedulingLink: row[7] || "",
          issueKey: row[8] || "",
          keywords: row[9] || "",
          faqLink: row[10] || "",
          image: row[11] || "",
        };
      })
      .filter((item): item is FullResource => item !== null);
  } catch (error: any) {
    console.error('Google Sheets API Error:', error.message);
    return [];
  }
}

/**
 * Look up a single resource by its spreadsheet row number.
 */
export async function getResourceByRow(rowNumber: number): Promise<FullResource | null> {
  try {
    const sheets = getSheets();

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `On Campus Resources!A${rowNumber}:L${rowNumber}`,
    });

    const vals = result.data.values;
    if (!vals || vals.length === 0) return null;

    const row = vals[0];
    return {
      row: rowNumber,
      category: row[0] || "",
      resourceName: row[1] || "",
      website: row[2] || "",
      contactEmail: row[3] || "",
      contactPhone: row[4] || "",
      location: row[5] || "",
      description: row[6] || "",
      schedulingLink: row[7] || "",
      issueKey: row[8] || "",
      keywords: row[9] || "",
      faqLink: row[10] || "",
      image: row[11] || "",
    };
  } catch (error: any) {
    console.error('Google Sheets API Error:', error.message);
    return null;
  }
}

/**
 * Returns all resources grouped by category, used for the landing page carousels.
 */
export async function callSheetsGroupedByCategory(): Promise<{ category: string; resources: FullResource[] }[]> {
  const all = await callSheetsWithRows();
  const map = new Map<string, FullResource[]>();
  for (const resource of all) {
    const cat = resource.category || 'Other';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(resource);
  }
  return Array.from(map.entries()).map(([category, resources]) => ({ category, resources }));
}

/**
 * Original function for displaying resource cards (title, website, image only).
 */
export async function callSheets(): Promise<Resource[]> {
  const fullResources = await callSheetsWithRows();
  return fullResources.map(r => ({
    title: r.resourceName,
    descrip: r.website || "https://www.rice.edu",
    image: r.image,
  }));
}