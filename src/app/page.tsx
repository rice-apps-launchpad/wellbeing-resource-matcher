'use client';

import { generateResponse, matchKeywords } from "./backend";
import { useState } from "react";

async function callAi(input: String) {
  generateResponse(input);
}

export default function Home() {
  let [textInput, setTextInput] = useState("");

  return (
    <div className="">
      <main className="">


        <input onChange={
          (event) => {
            setTextInput(event.target.value)
          }} />
        <button onClick={() => {
          callAi(textInput);
        }}>Submit</button>


        <input onChange={
          (event) => {
            setTextInput(event.target.value)
          }} />
        <button onClick={() => {
          matchKeywords(textInput);
        }}>Input</button>


      </main>
    </div>
  );
}

