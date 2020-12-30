import {Role} from './Role';

export interface UserModel {
  username: string;
  email: string;
  roles: Role[];

}
