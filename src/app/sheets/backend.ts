'use server';

import fetch from 'node-fetch';



// function formatStringAs2DStringArray(input: string): string[][] {
//   // Split the string by newline to get rows
//   const rows: string[] = input.split('\n');

//   // Map each row string to an array of strings by splitting on commas
//   const twoDArray: string[][] = rows.map(row => row.split('\t'));

//   return twoDArray;
// }


export async function callSheets(): Promise<string> {
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

  const response = await fetch('https://docs.google.com/spreadsheets/d/18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4/gviz/tq?tqx=out:csv&sheet=On%20Campus%20Resources');
  const sheets_text = await response.text();

  return sheets_text
}


//copy: 18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4
//original: 1XRGX2w3j4ufXP56XDwhtm9eG2Fx8EXxIwcx7V5xzdFY
