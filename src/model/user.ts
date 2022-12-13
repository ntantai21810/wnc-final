import { IBaseEntity } from "./base";
import { TRole } from "./role";

export interface IUser extends IBaseEntity {
  name: string;
  organization_id: number;
  role: TRole;
  user_id: string;
  email?: string;
  address?: string;
  business_registration_number?: string;
  contact_tel_number?: string;
  id_card_number?: string;
}
