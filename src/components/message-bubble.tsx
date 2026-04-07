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
        {message.message}
      </div>
    </div>
  );
}