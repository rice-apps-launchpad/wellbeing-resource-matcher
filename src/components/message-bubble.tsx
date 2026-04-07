import { ChatMessage, Sender } from "@/data/chat-message";

const styles = {
  row: {
    display: "flex",
    width: "100%",
  },

  userRow: {
    justifyContent: "flex-end",
  },

  aiRow: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "200px",
    display: "inline-block",
    borderRadius: "10px",
    padding: "8px",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  },

  userBubble: {
    color: "white",
    backgroundColor: "#3E5C93",
    border: "1px solid #3E5C93",
  },

  aiBubble: {
    color: "var(--ai-bubble-text)",
    backgroundColor: "var(--ai-bubble-bg)",
    border: "1px solid #BEBFBF",
  },
} as const;

interface MessageBubbleProps {
  message: ChatMessage;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderWithLinks(text: string) {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    URL_REGEX.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "underline"}}>
        {part}
      </a>
    ) : part
  );
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === Sender.user;

  return (
    <div
      style={{
        ...styles.row,
        ...(isUser ? styles.userRow : styles.aiRow),
      }}
    >
      <div
        style={{
          ...styles.bubble,
          ...(isUser ? styles.userBubble : styles.aiBubble),
        }}
      >
        {message.message ? renderWithLinks(message.message) : message.message}
      </div>
    </div>
  );
}