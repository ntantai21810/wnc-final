import { IBaseEntity } from "./base";

export interface INotification extends IBaseEntity {
  description: string;
  type: "Transaction" | "Debit" | "Charge";
  time: string;
}
