import { User } from "./user";

export class Chatmessage {
    readonly _id?: string;
    content?: string;
    date?: Date;
    friendID?: User[];
    userID?: User[];
    __v?: number;
}
