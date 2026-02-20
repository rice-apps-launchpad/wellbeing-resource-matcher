'use client';
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import {useRef, useState} from "react";
import {ChatMessage, Sender} from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";

export default function ChatPage() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className={"w-100 h-screen flex flex-col justify-end bg-[#E8E8E8] p-5"}>
      {/* This div holds all the messages */}
      <div className={"flex flex-col items-end gap-3"}>
        {messages.map((message, index) => {
          return (<MessageBubble message={message} key={index}/>)
        })}
      </div>
      <input className={"mt-5 mb-5 bg-white rounded-2xl border-[0.5px] border-[#9BA9B0] p-1"}
             placeholder={"Type your message..."}
             ref={chatInputRef}
             onKeyDown={event => {
               if (event.key === "Enter") {
                 // If chat input is empty, don't submit
                 const inputRef = chatInputRef.current;
                 if (!inputRef) {
                   return
                 }
                 if (inputRef.value == "") {
                   return
                 }
                 // "Submit" the message
                 setMessages(prevState => [...prevState, {message: inputRef.value, sender: Sender.user}]);
               }
             }}/>
    </div>
  )
}
