import { User } from "./user";

export class ResponseApiUser {

  public data!: User[];

  constructor(data: User[]) {

    this.data = data

  }


}
