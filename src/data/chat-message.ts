/*
Represents who the messasge is coming from (for blue or grey bubble)
 */
export enum Sender {
  user, // 0 
  server, // 1
}

/*
Represents a single chat message
 */
export interface ChatMessage {
  sender: Sender;
  message?: string;
  match?: Match;
}

interface Match {
  imageSrc: string;
  matchText?: string;
  title: string;
  description: string;
}