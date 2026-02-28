import {ChatMessage, Sender} from "@/data/chat-message";

const styles = {
  // bubble
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
      color: "black",
      backgroundColor: "#FFFFFF",
      border: "1px solid #BEBFBF",
    },
} as const;

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble(props: MessageBubbleProps) {
  if (props.message.sender === Sender.user) {
    return (
    <div style={{...styles.bubble, ...styles.userBubble}}>
      {props.message.message}
    </div>
    ); 
  } else {
    // grey bubble
    return (
    <div style={{...styles.bubble, ...styles.aiBubble}}>
      {props.message.message}
    </div>
    );
  }
}