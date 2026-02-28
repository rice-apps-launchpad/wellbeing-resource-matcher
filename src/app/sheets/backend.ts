'use server';

import fetch from 'node-fetch';

/**
 * Helper to parse a CSV string into an array of objects.
 * Based on the spreadsheet structure:
 * Col A (0): Category
 * Col B (1): Resource Name -> title
 * Col C (2): Website -> descrip
 */
function parseCSV(text: string) {
  const lines = text.split('\n');
  if (lines.length === 0) return [];

  return lines.slice(1).map(line => {
    // Regex to split by comma but ignore commas inside double quotes (standard CSV behavior)
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const values = line.split(regex).map(v => v.replace(/"/g, '').trim());
    
    return {
      // Index 1 corresponds to 'Resource Name' in your spreadsheet
      title: values[1] || "Untitled Resource",
      // Index 2 corresponds to 'Website' in your spreadsheet
      descrip: values[2] || "No website available",
      // Placeholder image since spreadsheet doesn't have an image column
      image: "/ccd.jpeg" 
    };
  }).filter(item => item.title && item.title !== "Resource Name"); 
}

export async function callSheets(): Promise<any[]> {
  'use server';

  // The below code is commented out — we are using a different URL route below
  // to download a CSV of the entire sheet to pass into the AI.

  /*// Create a new Sheets API client.
  const sheets = google.sheets({version: 'v4', auth: process.env.SHEETS_API_KEY});

  // Get the values from the spreadsheet.
  
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: '18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4',
    range: 'On Campus Resources!A2:K',
  });


  const vals = result.data.values;

  if (!vals || vals.length === 0) {
    console.log('No data found.');
    return null;
  }
  console.log(vals);
  console.log("test");*/

  // // Create a new Drive API client (v3).
  // const service = google.drive({version: 'v3', auth});

  // // Download the file.
  // const file = await service.files.export({
  //   fileID,
  //   mimeType: 'application/csv',
  // });

  // // Print the status of the download.
  // console.log(file);

  // return file;

  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4/gviz/tq?tqx=out:csv&sheet=On%20Campus%20Resources');
    const sheets_text = await response.text();
    
    // Return the parsed JSON array instead of raw text
    return parseCSV(sheets_text);
  } catch (error) {
    console.error("Error fetching Google Sheet:", error);
    return [];
  }
}

//copy: 18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4
//original: 1XRGX2w3j4ufXP56XDwhtm9eG2Fx8EXxIwcx7V5xzdFY