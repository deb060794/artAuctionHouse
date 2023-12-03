import { User } from "./user";

export class Comment{
    id?:number;
    content!:string;
    writerName!:string;
    dateCreated!: Date;
}
