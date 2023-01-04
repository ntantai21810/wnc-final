import { IBaseEntity } from "./base";

export interface IDebit extends IBaseEntity {
  fromAccountNumber: string;
  toAccountNumber: string;
  fromUser: string;
  toUser: string;
  bankDestinationId: number;
  bankSourceId: number;
  amount: number;
  time: string;
  dateDue: string;
  isPaid: boolean;
}
