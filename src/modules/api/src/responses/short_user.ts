import { UserType } from './user_type';

/** A link to the active user */
export interface ShortUser {
  id: number;
  userType: UserType;
}
