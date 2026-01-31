'use server';

import {google} from 'googleapis';
import {GoogleAuth} from 'google-auth-library';
import fetch from 'node-fetch';


// function formatStringAs2DStringArray(input: string): string[][] {
//   // Split the string by newline to get rows
//   const rows: string[] = input.split('\n');

//   // Map each row string to an array of strings by splitting on commas
//   const twoDArray: string[][] = rows.map(row => row.split('\t'));

//   return twoDArray;
// }


export async function callSheets() {
  'use server';

  // Create a new Sheets API client.
  const sheets = google.sheets({version: 'v4', auth: process.env.SHEETS_API_KEY});

  // Get the values from the spreadsheet.
  
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: '18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4',
    range: 'On Campus Resources!A2:K',
  });


  const vals = result.data.values;

  if (!vals || vals.length === 0) {
    console.log('No data found.');
    return [];
  }
  //console.log(vals);
  //console.log("test");

  
  const response = await fetch('https://docs.google.com/spreadsheets/d/18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4/gviz/tq?tqx=out:csv&sheet=On%20Campus%20Resources');



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

  console.log(await response.text())
  return vals

}


  // const headers = [
  //   'Category',
  //   'Resource Name',
  //   'Website',	
  //   'Contact',
  //   'Email',
  //   'Contact phone',
  //   'Location',
  //   'Description',
  //   'Scheduling link?',
  //   'Issue Key',
  //   'Key words',
  //   'Link to FAQ or About Page'																					
  // ];

  // const undefVal = (value: string | undefined | null): string => {
  //   if (value === undefined || value === null) {
  //     return '';
  //   }
    
  //   const stringValue = String(value);
  
  //   // Check if value contains special CSV characters
  //   if (
  //     stringValue.includes(',') || 
  //     stringValue.includes('"') || 
  //     stringValue.includes('\n') || 
  //     stringValue.includes('\r')
  //   ) {
  //     // Escape double quotes by doubling them (" -> "")
  //     return `"${stringValue.replace(/"/g, '""')}"`;
  //   }
    
  //   return stringValue;
  // };

  // const generateCsv = (data: (string | undefined)[][]): string => {
  //   const csvRows = [headers.join(',')];
  
  //   for (const row of data) {
  //     // Map headers to row values (handles rows that might be shorter than headers)
  //     const formattedRow = headers.map((_, index) => {
  //       const cellValue = row[index];
  //       return undefVal(cellValue);
  //     });
      
  //     csvRows.push(formattedRow.join(','));
  //   }
  
  //   return csvRows.join('\n');
  // };
  

  



  //console.log(csvString);
  //const filePath: string = 'output.csv';

  //return csvString;
  

//copy: 18HFumdaN6zCrMegt-tI-PODEHRkhQxiqtSCC2Gu22r4
//original: 1XRGX2w3j4ufXP56XDwhtm9eG2Fx8EXxIwcx7V5xzdFY
