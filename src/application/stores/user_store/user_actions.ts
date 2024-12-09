/** @fileoverview This file contains actions for user store */

import { UserType } from '@/application/models/user-type';
import { Action } from '@/modules/store_manager/action';
import { Applicant } from '@application/models/applicant';
import { Employer } from '@application/models/employer';

export enum UserActions {
  Logout = 'logout',
  Login = 'login',
}

export interface LogoutAction extends Action {
  type: UserActions.Logout;
}

export interface LoginActionPayload {
  email: string;
  userType: UserType;
  userProfile: Applicant | Employer;
}

export interface LoginAction extends Action {
  type: UserActions.Login;
  payload: LoginActionPayload;
}
