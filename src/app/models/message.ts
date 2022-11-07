import { User } from "./user";

export class Message{
  readonly _id?: string;
  users_id?: User[];
  messagesID?: Message[];
  friendId?: User[];
  date?: Date
  content?: string



}
