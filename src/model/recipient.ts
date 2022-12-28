import { IBaseEntity } from "./base";

export interface IRecipient extends IBaseEntity {
  accountNumber: number;
  suggestedName: string;
  bankDestinationId: number;
}
