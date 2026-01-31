'use client';
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import {useRef, useState} from "react";
import {ChatMessage} from "@/data/chat-message";

export default function ChatPage() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className={"w-100 h-screen flex flex-col justify-end bg-[#E8E8E8]"}>
      {messages.map((message, index) => {
        return renderMessage(message);
      })}
      <input className={"m-5 bg-white rounded-2xl border-[0.5px] border-[#9BA9B0] p-1"} placeholder={"Type your message..."} ref={chatInputRef}/>
    </div>
  )
}

function renderMessage(message: ChatMessage) {
  return (
    <div>{message.message}</div>
  )
}
