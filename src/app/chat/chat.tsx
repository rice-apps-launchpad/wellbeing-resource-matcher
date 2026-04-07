'use client';
/*
This will be the "chat" page for both desktop and mobile! It can take infinitely many messages and scrolls
automatically.
 */

import {Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import {ChatMessage, Match, Sender} from "@/data/chat-message";
import MessageBubble from "@/components/message-bubble";
import {matchKeywords} from "@/app/ai/backend";
import {FullResource, getResourceByRow} from "@/app/sheets/backend";
import followups from "@/app/ai/followups.json";
// Indicator Typing
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {TypingIndicator} from "@chatscope/chat-ui-kit-react";
import BigPopupMobile from "@/components/big-popup/big-popup-mobile";
import Image from "next/image";

interface ChatPageProps {
  isLaptop: boolean;
  setMatch: Dispatch<SetStateAction<Match | undefined>>;
  pendingQuestion?: string;
  clearPendingQuestion?: () => void;
  onFirstMessage?: () => void;
  onSessionTerminate?: () => void;
  landingSlot?: ReactNode;
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--chat-panel-bg)",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "20px",
  },
  messagesScroll: {
    flex: "1 1 0",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    paddingRight: "20px",
  },
  typingRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "8px",
  },
  input: {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    backgroundColor: "var(--input-bg)",
    color: "var(--foreground)",
    borderRadius: "24px",
    border: "0.5px solid var(--input-border)",
    padding: "6px",
    paddingLeft: "12px",
    outline: "none",
  },
  restartButton: {
    marginRight: "20px",
    marginBottom: "20px",
    padding: "8px",
    backgroundColor: "#3B82F6",
    color: "white",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
  },
  alsoConsiderLabel: {
    color: "var(--section-heading)",
    fontWeight: "bold",
    fontSize: "14px",
    margin: 0,
  },
  otherMatchCard: {
    backgroundColor: "#00205B",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
} as const;

export default function ChatPage({
                                   isLaptop,
                                   setMatch,
                                   pendingQuestion,
                                   clearPendingQuestion,
                                   onFirstMessage,
                                   onSessionTerminate,
                                   landingSlot
                                 }: ChatPageProps) {
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

  // Populate the input when a pending question is set (e.g. from example question chips)
  useEffect(() => {
    if (!pendingQuestion) return;
    if (chatInputRef.current) {
      chatInputRef.current.value = pendingQuestion;
      chatInputRef.current.focus();
    }
    clearPendingQuestion?.();
  }, [pendingQuestion]);

  const terminateSession = () => {
    setMessages([]);
    setHistoryMessages([]);
    setIsSessionActive(true); // Reset the lock if you clear the chat
    setIsTyping(false); // Reset typing indicator state when starting a new session
    setMatch(undefined); // Clear match so desktop shows AllResources again
    onSessionTerminate?.();
  };

  return (
    <div style={styles.container}>
      {/* Landing slot: shown before any messages (mobile Ask tab) */}
      {landingSlot && messages.length === 0 && (
        <div style={{flex: '1 1 0', minHeight: 0, overflow: 'auto', paddingRight: '20px'}}>
          {landingSlot}
        </div>
      )}

      {/* This div holds all the messages */}
      <div
        ref={scrollViewRef}
        style={{
          ...styles.messagesScroll,
          display: (landingSlot && messages.length === 0) ? 'none' : undefined,
        }}
      >
        {/* Spacer pushes messages to the bottom when there are few of them */}
        <div style={{flex: 1}}/>
        {/* check if messages.map is a message or match*/}
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {messages.map((chatMessage, index) => {
            if (chatMessage.message != null) {
              return <MessageBubble message={chatMessage} key={index}/>;
            } else if (chatMessage.match != null) {
              console.log("Hello")
              console.log(chatMessage.match)
              // We will only render the BigPopup inline in the chat if we are on mobile!
              console.log("isLaptop" + isLaptop)
              return !isLaptop ? (
                <div key={index} style={{display: "flex", flexDirection: "column", gap: "12px", width: "100%"}}>
                  <BigPopupMobile
                    title={chatMessage.match.title}
                    description={chatMessage.match.description}
                    imageSrc={chatMessage.match?.imageSrc}
                  />
                  {chatMessage.match.otherMatches && chatMessage.match.otherMatches.length > 0 && (
                    <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                      <p style={styles.alsoConsiderLabel}>Also consider:</p>
                      {chatMessage.match.otherMatches.map((m, i) => (
                        <div key={i} style={styles.otherMatchCard}>
                          {m.imageSrc && (
                            <div style={{width: "100%", height: "100px", position: "relative"}}>
                              <Image src={m.imageSrc} alt={m.title}
                                     style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                            </div>
                          )}
                          <div style={{padding: "12px 16px", color: "white"}}>
                            <p style={{fontWeight: "bold", fontSize: "16px", margin: "0 0 4px 0"}}>{m.title}</p>
                            <p style={{
                              fontSize: "13px",
                              opacity: 0.85,
                              margin: 0,
                              lineHeight: "1.4"
                            }}>{m.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null;
            }
          })}
          {/* Typing indicator */}
          {isTyping && (
            <div style={styles.typingRow}>
              <TypingIndicator content="Owl Resource Matcher is thinking" style={{backgroundColor: 'transparent'}}/>
            </div>
          )}
        </div>
      </div>

      <input
        disabled={!isSessionActive}
        style={{...styles.input, cursor: isSessionActive ? 'text' : 'not-allowed', opacity: isSessionActive ? 1 : 0.6}}
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
            if (messages.length === 0) onFirstMessage?.();
            setMessages(prevState => [...prevState, {message: userText, sender: Sender.user}]);
            setHistoryMessages(prevMes => [...prevMes, "User: " + userText])
            inputRef.value = ""; // Clear input immediately

            // Start typing
            setIsTyping(true);

            try {
              const response = await matchKeywords(userText, historyMessages);
              const match = response.match;

              // If there is no match, there is a follow-up question
              if (match == undefined) {
                // If there's no match, there should be a follow-up question
                if (response.follow_up_question == undefined) {
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
                const [resource, ...otherMatchResources] = await Promise.all([
                  getResourceByRow(match.resource_row),
                  ...(response.other_matches ?? []).map(m => getResourceByRow(m.resource_row)),
                ]);
                if (resource == null) {
                  throw new Error(`Could not find resource at row ${match.resource_row}`);
                }

                const otherMatches: Match[] = (otherMatchResources as (FullResource | null)[])
                  .filter((r): r is FullResource => r !== null)
                  .map(r => ({
                    imageSrc: "/" + r.image || "/rpc.jpg",
                    title: r.resourceName,
                    description: r.description,
                  }));

                const matchData: Match = {
                  imageSrc: "/" + resource.image || "/rpc.jpg", // Fallback image
                  matchText: resource.location,
                  title: resource.resourceName,
                  description: resource.description,
                  otherMatches,
                };

                let finalMsg: string = ""
                if (resource.resourceName) {
                  finalMsg += "We think that the best match for you is " + resource.resourceName + ".\n"
                }
                if (resource.location) {
                  finalMsg += "You can visit them in person at: " + resource.location + ".\n"
                }
                if (resource.contactEmail && resource.contactPhone) {
                  finalMsg += "You can contact them by email at: " + resource.contactEmail + " and by phone at: " + resource.contactPhone + ".\n"
                } else if (resource.contactEmail) {
                  finalMsg += "You can contact them by email at: " + resource.contactEmail + ".\n"
                } else if (resource.contactPhone) {
                  finalMsg += "You can contact them by phone at: " + resource.contactPhone + ".\n"
                }
                if (resource.schedulingLink) {
                  finalMsg += "Make an appointment at: " + resource.schedulingLink + ".\n"
                }

                setMessages(prevState => [...prevState,
                  {message: finalMsg, sender: Sender.server},
                  {
                    match: matchData,
                    sender: Sender.server,
                  }
                ]);

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
          style={styles.restartButton}
        >
          Start New Search
        </button>
      )}
    </div>
  );
}
