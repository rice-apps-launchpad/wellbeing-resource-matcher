import {google} from 'googleapis';

async function callSheets() {

  
  // Create a new Sheets API client.
  const sheets = google.sheets({version: 'v4', auth});
  // Get the values from the spreadsheet.
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  });
  const rows = result.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
}



export default function Sheets() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button onClick={callSheets}>
          Click me
        </button>
      </main>
    </div>
  );
}