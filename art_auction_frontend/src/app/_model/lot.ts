import { Art } from "./art";

export class Lot{
    id?:number;
    endDate!: Date;
    startDate!:Date;
    arts?:Art[];
    processed?:boolean;
}
