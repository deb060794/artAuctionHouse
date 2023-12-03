
import { Art } from "./art";
import { OrderState } from "./orderState";
import { User } from "./user";

export class Order {
    id?: number;
    buyer?: User;
    art?: Art;
    orderDate?: Date;
    quantity?: number;
    totalPrice?: number;
    state?: OrderState;
    }
    
    