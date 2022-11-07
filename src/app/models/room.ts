import { Message } from "./message";
import { User } from "./user";

export class Room {
  readonly _id?:string;
  owners_id?:User[];
  users_id?:User[];
  messagesID?:Message[];
}
