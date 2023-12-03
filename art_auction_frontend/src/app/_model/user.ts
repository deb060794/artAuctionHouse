import {Role} from './role';
export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  firstname!: string;
  lastname!: string;
  address!: string;
  deactivate!: boolean;
  roles!: Role[];
  token?: string;

}
