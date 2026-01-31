/*
Represents who the messasge is coming from (for blue or grey bubble)
 */
enum Sender {
  user,
  server,
}

/*
Represents a single chat message
 */
interface ChatMessage {
  sender: Sender;
  message: string;
}