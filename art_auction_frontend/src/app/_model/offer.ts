import { Art } from "./art";
import { BidState } from "./bidState";

import { User } from "./user";

export class Offer {
    id?: number;
    bidder: User=new User();
    art: Art=new Art();
    amount: number=0;
    bidDate: Date=new Date();
    state!: BidState;
    
    
} 
