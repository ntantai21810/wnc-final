import { IBaseEntity } from "./base";
import { IRecipient } from "./recipient";
import { TRole } from "./role";

export interface IAccount extends IBaseEntity {
  accountNumber: number;
  fullName: string;
  balance: number;
  email: string;
  role: TRole;
  isActive: true;
  recipients: IRecipient[];
  bankAccountId: number;
}
