'use client';
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import {useEffect, useRef, useState} from "react";
import {ChatMessage, Sender} from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";

export default function ChatPage() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // When `messages` changes, we might need to scroll to bottom
  useEffect(() => {
    // https://stackoverflow.com/a/21067431
    const scrollView = scrollViewRef.current;
    if (!scrollView) return;
    console.log(scrollView.scrollHeight)
    console.log(scrollView.clientHeight)
    console.log(scrollView.scrollTop + 1)
    const isScrolledToBottom = scrollView.scrollHeight - scrollView.clientHeight <= scrollView.scrollTop + 1;
    if (isScrolledToBottom)
      scrollView.scrollTop = scrollView.scrollHeight - scrollView.clientHeight;
  }, [messages]);

  const scrollViewRef = useRef<HTMLDivElement>(null);

  return (
    <div className={"w-100 h-screen flex flex-col justify-end bg-[#E8E8E8] pb-5 pl-5"}>
      {/* This div holds all the messages */}
      <div ref={scrollViewRef} className={"flex flex-col items-end gap-3 overflow-scroll pr-5"}>
        {messages.map((message, index) => {
          return (<MessageBubble message={message} key={index}/>)
        })}
      </div>
      <input className={"mt-5 mb-5 bg-white rounded-2xl border-[0.5px] border-[#9BA9B0] p-1 mr-5"}
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
