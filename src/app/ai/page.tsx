'use client';

import { generateResponse, matchKeywords } from "./backend";
import {useRef, useState} from "react";

async function callAi(input: string) {
  return generateResponse(input);
}

export default function Home() {
  const geminiInputRef = useRef<HTMLInputElement>(null);
  const keywordsInputRef = useRef<HTMLInputElement>(null);

  const [geminiResponseText, setGeminiResponseText] = useState("")

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div>
          <h1 className={"mt-10"}>Call Gemini:</h1>
          <input className={"border mr-2"} ref={geminiInputRef} />
          <button className={"mb-10"} onClick={() => {
            // Only run callAi if geminiInputRef is not null
            if (geminiInputRef.current) {
              callAi(geminiInputRef.current.value).then(value => {
                setGeminiResponseText(value ?? "")
              });
            }
          }}>Submit
          </button>
          {/* Gemini output goes below: */}
          <div>
            {geminiResponseText}
          </div>
        </div>

        <div>
          <h1>Match keywords:</h1>
          <input className={"border mr-2"} ref={keywordsInputRef} />
          <button onClick={() => {
            // Only run matchKeywords if keywordsInputRef is not null
            if (keywordsInputRef.current) {
              matchKeywords(keywordsInputRef.current.value);
            }
          }}>Submit
          </button>
        </div>

      </main>
    </div>
  );
}

