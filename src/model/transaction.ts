import { IBaseEntity } from "./base";

export interface ITransaction extends IBaseEntity {
  fromAccountNumber: string;
  toAccountNumber: string;
  fromUser: string;
  toUser: string;
  type: string;
  bankDestinationId: number;
  bankSourceId: number;
  amount: number;
  time: string;
}
