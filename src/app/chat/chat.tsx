'use client';
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {ChatMessage, Sender} from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";
import {matchKeywords} from "@/app/ai/backend";
import {getResourceByRow} from "@/app/sheets/backend";
import {Match} from "@/data/chat-message"
import followups from "@/app/ai/followups.json";
// Indicator Typing
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {TypingIndicator} from "@chatscope/chat-ui-kit-react";
import BigPopupMobile from "@/components/big-popup/big-popup-mobile";

interface ChatPageProps {
  isLaptop: boolean;
  setMatch: Dispatch<SetStateAction<Match | undefined>>;
}

export default function ChatPage({isLaptop, setMatch}: ChatPageProps) {
  // A ref to the chat input field so that we can reference the value when we submit a message
  const chatInputRef = useRef<HTMLInputElement>(null);
  // A ref to the scroll view so that we can auto scroll to the bottom
  const scrollViewRef = useRef<HTMLDivElement>(null);
  // A list containing all the messages in the chat, as ChatMessage objects to be rendered
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // A list containing all the chat's messages (both user and server) as *strings*, used for chat history
  const [historyMessages, setHistoryMessages] = useState<string[]>([]);
  //typing indicator state
  const [isTyping, setIsTyping] = useState(false);
  // isSessionActive is true if a current chat is ongoing, false if a match is found
  const [isSessionActive, setIsSessionActive] = useState(true);

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
    setHistoryMessages([]);
    setIsSessionActive(true); // Reset the lock if you clear the chat
    setIsTyping(false); // Reset typing indicator state when starting a new session
  };

  return (
    <div className={"h-screen flex flex-col justify-end bg-[#E8E8E8] pt-5 pb-5 pl-5"}>
      {/* This div holds all the messages */}
      <div
        ref={scrollViewRef}
        className={"flex flex-col items-end gap-3 overflow-scroll pr-5"}
      >
        {/* check if messages.map is a message or match*/}
        {messages.map((chatMessage, index) => {
          if (chatMessage.message != null) {
            return <MessageBubble message={chatMessage} key={index}/>;
          } else if (chatMessage.match != null) {
            console.log("Hello")
            console.log(chatMessage.match)
            // We will only render the BigPopup inline in the chat if we are on mobile!
            console.log("isLaptop" + isLaptop)
            return !isLaptop ? <BigPopupMobile
              key={index}
              title={chatMessage.match.title}
              description={chatMessage.match.description}
              imageSrc={chatMessage.match?.imageSrc}
            /> : null;
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
            setHistoryMessages(prevMes => [...prevMes, "User: " + userText])
            inputRef.value = ""; // Clear input immediately

            // Start typing
            setIsTyping(true);

            try {
              const response = await matchKeywords(userText, historyMessages);
              const match = response.match;

              // If there is no match, there is a follow-up question
              if (!match) {
                // If there's no match, there should be a follow-up question
                if (!response.follow_up_question) {
                  throw new Error("No match nor follow-up question");
                }
                // Convert make sure AI provided ID exists in our followups JSON
                const rawId = String(response.follow_up_question);
                if (!(rawId in followups)) {
                  throw new Error(`Invalid follow-up ID received: ${rawId}`);
                }
                const followUpId = rawId as keyof typeof followups;

                setMessages(prev => [...prev, {message: followups[followUpId], sender: Sender.server}]);
                setHistoryMessages(prevMes => [...prevMes, "AI: " + followups[followUpId]])
                console.log(setHistoryMessages)
              } else {
                // Look up the full resource data from the Google Sheet by row number
                const resource = await getResourceByRow(match.resource_row);
                if (!resource) {
                  throw new Error(`Could not find resource at row ${match.resource_row}`);
                }

                const matchData: Match = {
                  imageSrc: "/" + resource.image || "/rpc.jpg", // Fallback image
                  matchText: resource.location,
                  title: resource.resourceName,
                  description: resource.description,
                };

                setMessages(prev => [...prev, {
                  message: `Resource found: ${resource.resourceName}`,
                  sender: Sender.server
                },
                  {
                    match: matchData,
                    sender: Sender.server,
                  },]);

                setMatch(matchData);
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





