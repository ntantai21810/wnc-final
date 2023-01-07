import { IBaseEntity } from "./base";

export interface IStaff extends IBaseEntity {
  role: string;
  isActive: true;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  indentityNumber: string;
  balance: number;
}
