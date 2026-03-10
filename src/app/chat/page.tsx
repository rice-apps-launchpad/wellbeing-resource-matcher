'use client';

import {useEffect, useRef, useState} from "react";
import {ChatMessage, Sender} from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";
import {matchKeywords} from "@/app/ai/backend";

export default function ChatPage() {
  const chatInputRef = useRef<HTMLInputElement>(null);
  // A list containing all the messages in the chat, as ChatMessage objects to be rendered
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // A list containing all the user's messages as strings, used for chat history
  const [userMessages, setUserMessages] = useState<string[]>([]);
  // isSessionActive is true if a current chat is ongoing, false if a match is found
  const [isSessionActive, setIsSessionActive] = useState(true);

  useEffect(() => {
    const scrollView = scrollViewRef.current;
    if (!scrollView) return;
    console.log(scrollView.scrollHeight)
    console.log(scrollView.clientHeight)
    console.log(scrollView.scrollTop + 1)
    const isScrolledToBottom = scrollView.scrollHeight - scrollView.clientHeight <= scrollView.scrollTop + 1;
    if (isScrolledToBottom)
      scrollView.scrollTop = scrollView.scrollHeight - scrollView.clientHeight;
  }, [messages]);

  const terminateSession = () => {
    setMessages([]);
    setUserMessages([]);
    setIsSessionActive(true); // Reset the lock if you clear the chat
  };

  const scrollViewRef = useRef<HTMLDivElement>(null);

  return (
    <div className={"w-100 h-screen flex flex-col justify-end bg-[#E8E8E8] pb-5 pl-5"}>
      <div ref={scrollViewRef} className={"flex flex-col items-end gap-3 overflow-scroll pr-5"}>
        {messages.map((message, index) => {
          return (<MessageBubble message={message} key={index}/>)
        })}
      </div>

      <input
             disabled={!isSessionActive}
             style={{ cursor: isSessionActive ? 'text' : 'not-allowed', opacity: isSessionActive ? 1 : 0.6 }}

             className={"mt-5 mb-5 bg-white rounded-2xl border-[0.5px] border-[#9BA9B0] p-1 mr-5"}
             placeholder={isSessionActive ? "Type your message..." : "Chat ended."}
             ref={chatInputRef}
             onKeyDown={event => {
               if (event.key === "Enter") {
                 const inputRef = chatInputRef.current;
                 if (!inputRef || inputRef.value == "" || !isSessionActive) {
                   return
                 }

                 setMessages(prevState => [...prevState, {message: inputRef.value, sender: Sender.user}]);
                 setUserMessages(prevMes => [...prevMes, inputRef.value])

                 matchKeywords(inputRef.value, userMessages).then((response) => {
                  if(response.match == null){
                    setMessages(prevState => [...prevState, {message: response.follow_up_question, sender: Sender.server}]);
                  } else {
                    setMessages(prevState => [...prevState,
                    {message: `Resource found: ${response.match.resource_name}`, sender: Sender.server}
                    ]);

                    setIsSessionActive(false);
                    inputRef.value = ""; // Clear the input one last time
                  }
                 });
               }
             }}/>

      {/* Show a Restart button only when session is inactive */}
      {!isSessionActive && (
        <button
          onClick={terminateSession}
          className="mr-5 mb-5 p-2 bg-blue-500 text-white rounded-xl"
        >
          Start New Search
        </button>
      )}
    </div>
  )
}