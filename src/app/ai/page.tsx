'use client';

import { generateResponse, matchKeywords } from "./backend";
import { useState } from "react";

async function callAi(input: string) {
  await generateResponse(input);
}

export default function Home() {
  const [textInput, setTextInput] = useState("");

  return (
    <div className="flex justify-center">
      <main className="">
        <h1 className={"mt-10"}>Call Gemini:</h1>
        <input className={"border mr-2"} onChange={
          (event) => {
            setTextInput(event.target.value)
          }} />
        <button className={"mb-10"} onClick={() => {
          callAi(textInput);
        }}>Submit</button>

        <h1>Match keywords:</h1>
        <input className={"border mr-2"} onChange={
          (event) => {
            setTextInput(event.target.value)
          }} />
        <button onClick={() => {
          matchKeywords(textInput);
        }}>Submit</button>
      </main>
    </div>
  );
}

