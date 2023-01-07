import { IBaseEntity } from "./base";

export interface IRecipient extends IBaseEntity {
  accountNumber: string;
  suggestedName: string;
  bankDestinationId: number;
}
