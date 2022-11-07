// héritage exemple

import { Message } from "./message";
import { Room } from "./room";

class Role {
  constructor() {
  }
}
// lorsqu'on créee une interface tous leq attributs implémentés dans
// lorsqu'on hérite d'une classe on extends et on peut accéder aux attributs
//  de cette class a travers la super méthode super(nomAttribut) auquel je souhiate accéder

// on redéclare tous les attributs ds Interface on met I et nom du Model
// extends pour hériter de la class User
export class User  {
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public avatar!: string;
  public password!: string;
  public roomsID!: Room[];
  public email?: string;
  // read only = lecture seule mais pas de mofi possible car lecture seule
  readonly _id?: string;
  // tableau de type room
  public sentMessagesID!: Message[];
  public recievedMessagesID!: Message[];
  public isLoggedIn!: boolean;
  public token?: string;
  public country?: string;
  public city?: string;
  public street?: string;
  public zipCode?: number;
  public phoneNumber?: string;
  public dialCode?: string;
  public skills?: string[];
  public role?: string;
  public friendsID?: string;



  constructor() {
    // on utilise
    //! super()
    //  pour hériter des méthodes et des propriétés du constructor
    //* on écrit super si on veut rajouter des attributs dans notre class + attributs de class mere
    // on recup tous attributs ds construteur


  }
  // créer un service globalhttp; qui aura comme constructor


}

// * imposer des attributs/éléments à cette Interface

