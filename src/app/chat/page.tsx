'use client';
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChatMessage, Sender } from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";
import {matchKeywords} from "@/app/ai/backend";
// Indicator Typing
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {TypingIndicator} from "@chatscope/chat-ui-kit-react";
import BigPopup from "@/components/big-popup/big-popup";
import BigPopupMobile from "@/components/big-popup/big-popup-mobile";
import MobileScreen from "@/components/small-popup/mobile-screen"; 

interface ChatPageProps {
  isLaptop: boolean;
  setIsLaptop: Dispatch<SetStateAction<boolean>>;
}

// TODO: isLaptop and setIsLaptop are currently unused, but will be used to
//  conditionally show the big popup inline in the chat if we're on the mobile view.
export default function ChatPage({isLaptop, setIsLaptop}: ChatPageProps) {
  // A ref to the chat input field so that we can reference the value when we submit a message
  const chatInputRef = useRef<HTMLInputElement>(null);
  // A ref to the scroll view so that we can auto scroll to the bottom
  const scrollViewRef = useRef<HTMLDivElement>(null);
  // A list containing all the messages in the chat, as ChatMessage objects to be rendered
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // A list containing all the user's messages as strings, used for chat history
  const [userMessages, setUserMessages] = useState<string[]>([]);
  //typing indicator state
  const [isTyping, setIsTyping] = useState(false);
  // isSessionActive is true if a current chat is ongoing, false if a match is found
  const [isSessionActive, setIsSessionActive] = useState(true);
  // isMobileScreen is true when the user is in mobile view, false if isLaptop is true
  const [isMobileScreen, setMobileScreen] = useState(false)

  {/* This section is for the mobile homescreen pop up*/}
  useEffect(() => {
    if (!isLaptop) {
      setMobileScreen(true);
    }
  }, [isLaptop]); // unsure of this part


  // When `messages` changes, we might need to scroll to bottom
  // TODO: I don't think this is currently working!
  useEffect(() => {
    // https://stackoverflow.com/a/21067431
    const scrollView = scrollViewRef.current;
    if (!scrollView) return;
    console.log(scrollView.scrollHeight);
    console.log(scrollView.clientHeight);
    console.log(scrollView.scrollTop + 1);
    const isScrolledToBottom =
      scrollView.scrollHeight - scrollView.clientHeight <=
      scrollView.scrollTop + 1;
    if (isScrolledToBottom)
      scrollView.scrollTop = scrollView.scrollHeight - scrollView.clientHeight;
  }, [messages]);

  const terminateSession = () => {
    setMessages([]);
    setUserMessages([]);
    setIsSessionActive(true); // Reset the lock if you clear the chat
    setIsTyping(false); // Reset typing indicator state when starting a new session
  };

  return (
    <div className={"h-screen flex flex-col justify-end bg-[#E8E8E8] pb-5 pl-5"}>
    {/* This section is for the mobile homescreen*/}
    {!isLaptop && messages.length === 0 && isMobileScreen && (
      <MobileScreen />
    )}

      {/* This div holds all the messages */}
      <div
        ref={scrollViewRef}
        className={"flex flex-col items-end gap-3 overflow-scroll pr-5"}
      >
        {/* check if messages.map is a message or match*/}
        {messages.map((chatMessage, index) => {
          if (chatMessage.message != null) {
            return <MessageBubble message={chatMessage} key={index} />;
          } else if (chatMessage.match != null) {
            console.log("Hello")
            console.log(chatMessage.match)
            return <BigPopupMobile
            key={index}
            title={chatMessage.match.title}
            description={chatMessage.match.description}
            imageSrc={chatMessage.match?.imageSrc}
            />;
          }
        })}
        {/* Typing indicator */}
        {isTyping && (
          <div className="w-full flex justify-start mb-2">
            <TypingIndicator content="Owl Resource Matcher is thinking" style={{backgroundColor: 'transparent'}}/>
          </div>
        )}
      </div>

      <input
        disabled={!isSessionActive}
        style={{cursor: isSessionActive ? 'text' : 'not-allowed', opacity: isSessionActive ? 1 : 0.6}}

        className={"mt-5 mb-5 bg-white rounded-2xl border-[0.5px] border-[#9BA9B0] p-1 mr-5"}
        placeholder={isSessionActive ? "Type your message..." : "Chat ended."}
        ref={chatInputRef}
        onKeyDown={async event => {
          if (event.key === "Enter") {
            // If chat input is empty, don't submit
            const inputRef = chatInputRef.current;
            if (!inputRef || inputRef.value === "" || !isSessionActive) {
              return
            }

            // "Submit" the message
            const userText = inputRef.value;
            setMessages(prevState => [...prevState, {message: userText, sender: Sender.user}]);
            setUserMessages(prevMes => [...prevMes, userText])
            inputRef.value = ""; // Clear input immediately

            // Start typing
            setIsTyping(true);

            try {
              const response = await matchKeywords(userText, userMessages);

              if (response.match == null) {
                setMessages(prev => [...prev, {message: response.follow_up_question, sender: Sender.server}]);
              } else {
                setMessages(prev => [...prev, {
                  message: `Resource found: ${response.match.resource_name}`,
                  sender: Sender.server
                },
                  {
                    match: {
                      imageSrc: "/rpc.jpg", // temporary image
                      matchText: response.match.resource_location,
                      title: response.match.resource_name,
                      // description: response.match.descripition,
                      description: "This is a test description. It can be very long sometimes so let's make sure it looks good!",
                    },
                    sender: Sender.server,
                  },]);
                setIsSessionActive(false);
              }
            } finally {
              // Stop typing
              setIsTyping(false);
            }
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
  );
}





