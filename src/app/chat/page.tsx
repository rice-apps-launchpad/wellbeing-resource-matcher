'use client'; // double check this
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {ChatMessage, Sender} from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";
import {matchKeywords} from "@/app/ai/backend";

interface ChatPageProps {
  isLaptop: boolean,
  setIsLaptop: Dispatch<SetStateAction<boolean>>,
}

export default function ChatPage({ props }: ChatPageProps) {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessages, setUserMessages] = useState<string[]>([]);

  // new for laptop-mobile screen changing
  // set to false intially -> if screen detetcs a laptop view-> switch

  

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

  const terminateSession = () => {
    setMessages([]); // Clears history so the next chat starts fresh
  };
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
                 setUserMessages(prevMes => [...prevMes, inputRef.value])


                 // Generate response
                 matchKeywords(inputRef.value, userMessages).then((response) => {
                  if(response.match == null){
                    setMessages(prevState => [...prevState, {message: response.follow_up_question, sender: Sender.server}]);
                    console.log(messages)

                  } else {
                    setMessages(prevState => [...prevState, 
                    {message: `Resource found: ${response.match.resource_name}`, sender: Sender.server}
                    ]);


                    
                  }



                  // Add the UI to display the big popup ONLY IF a “mobile view” flag is set
                  // otherwise, this popup should be size 0 / invisible / hidden / not rendered.

                  // flag should be a useState
                  // (set Two booleans = False)
                  
                  // screenFlag()
                  // if width > height == True:
                  // bool laptopScreen = True



                  //console.log("RESPONSE" + response.match.resource_name) 



                 });             
                 
               }
             }}/>
    </div>
  )
}





