import { getAccessToken } from '../../utils/helpers';
import { ActionMap } from '../helpers';

export type AuthenticationType = {
  token?: string;
};

export enum AuthActionsTypes {
  LoggedIn = 'LOGGED_IN',
  SignOut = 'SIGN_OUT',
  Refresh = 'REFRESH',
}

// Read the data from the local storage.
export const authInitialState: AuthenticationType = {
  token: getAccessToken(),
};

type AuthPayload = {
  [AuthActionsTypes.LoggedIn]: AuthenticationType;
  [AuthActionsTypes.Refresh]: AuthenticationType;
  [AuthActionsTypes.SignOut]: AuthenticationType;
};

/**
 * Available Authentication Actions.
 */
export type AuthAction = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
