import MessageBubble from "@/app/components/message-bubble";
import {Sender} from "@/data/chat-message";

export default function TestPage() {
  return (
    <div>
      <MessageBubble message={{message: "This is a test from a user", sender: Sender.user}}/>
      <MessageBubble message={{message: "This is a test from a server", sender: Sender.server}}/>
    </div>
  )
}