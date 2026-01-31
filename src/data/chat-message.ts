/*
Represents who the messasge is coming from (for blue or grey bubble)
 */
export enum Sender {
  user,
  server,
}

/*
Represents a single chat message
 */
export interface ChatMessage {
  sender: Sender;
  message: string;
}