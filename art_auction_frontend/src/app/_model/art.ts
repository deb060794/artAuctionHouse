import { Artist } from "./artist";
import { AuctionState } from "./auctionState";

import { Category } from "./category";
import { Lot } from "./lot";
import { User } from "./user";

export class Art {
    id?: number;
    title!: string;
    description: string="";
    imageUrl: string="";
    creationDate: Date=new Date();
    initialPrice: number=0;
    lot: Lot = new Lot();
    seller: User=new User();
    buyer: User=new User();
    state!: AuctionState;
    artist: Artist=new Artist();
    category!: Category;
    

  }