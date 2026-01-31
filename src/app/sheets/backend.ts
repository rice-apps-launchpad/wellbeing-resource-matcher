'use server';

import {google} from 'googleapis';

// import { GoogleSpreadsheet } from 'google-spreadsheet'

// OUR API KEY : AIzaSyBmY9HxIXGtTEXCm2HKzjlUtlXuNwTsGws

const apiKey = 'AIzaSyBmY9HxIXGtTEXCm2HKzjlUtlXuNwTsGws';

export async function callSheets() {
  'use server';

  // Create a new Sheets API client.
  const sheets = google.sheets({version: 'v4', auth: apiKey});

  // Get the values from the spreadsheet.
  
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  });


  const vals = result.data.values;

  if (!vals || vals.length === 0) {
    console.log('No data found.');
    return [];
  }
  console.log(vals);


  // if (vals && vals.length) {
  //   vals.forEach((vals) => {
  //     console.log(`${vals[0]}`); //GETTING FIRST COLUMN
  //   });

  //   //GETTING ALL ROWS
  //   for (let i = 0; i <30; i++){
  //     console.log(`${vals[i]}`);
  //   }

    

  // } else {
  //   console.log('No data found.');
  // }
  // return;

//   if (vals && vals.length) {
//     vals.forEach((vals[0]=="Female") => {
//       console.log(`${vals[0]}`); //GETTING FIRST COLUMN
//     });

//     //GETTING ALL ROWS
//     for (let i = 0; i <30; i++){
//       console.log(`${vals[i]}`);
//     }

    

//   } else {
//     console.log('No data found.');
//   }
//   return;
}