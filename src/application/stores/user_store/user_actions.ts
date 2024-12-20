/** @fileoverview This file contains actions for user store */

import { UserType } from '@/application/models/user-type';
import { Action } from '@/modules/store_manager/action';
import { Applicant } from '@application/models/applicant';
import { Employer } from '@application/models/employer';
import { LoginFormData, RegistrationFormData } from './user_store';

export enum UserActions {
  Logout = 'logout',
  Login = 'login',
  LoginFormSubmit = 'loginFormSubmit',
  RegistrationFormSubmit = 'registrationFormSubmit',
  UpdateProfile = 'updateUserProfile',
  NotificationsUpdated = 'notificationsUpdated',
}

export interface LogoutAction extends Action {
  type: UserActions.Logout;
}

export interface LoginActionPayload {
  id: number;
  userType: UserType;
  userProfile: Applicant | Employer;
  csrfToken?: string;
}

export interface LoginAction extends Action {
  type: UserActions.Login;
  payload: LoginActionPayload;
}

export interface LoginFormSubmitAction extends Action {
  type: UserActions.LoginFormSubmit;
  payload: LoginFormData;
}

export interface RegistrationFormSubmitAction extends Action {
  type: UserActions.RegistrationFormSubmit;
  payload: RegistrationFormData;
}

export interface UpdateProfileAction extends Action {
  type: UserActions.UpdateProfile;
  payload: Applicant | Employer;
}

export interface NotificationsUpdatedAction extends Action {
  type: UserActions.NotificationsUpdated;
}
