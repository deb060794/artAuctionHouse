import { Country } from "./country";

export class Artist{
    id?: number;
    name!: string;
    imageUrl: string="";
    description: string="";
    country!: Country;
    
}

