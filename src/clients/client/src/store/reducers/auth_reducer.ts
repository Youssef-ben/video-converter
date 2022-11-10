/* eslint-disable import/prefer-default-export */
import { AuthAction, AuthActionsTypes, AuthenticationType } from '../actions/auth_actions';

export const authReducer = (state: AuthenticationType, action: AuthAction): AuthenticationType => {
  switch (action.type) {
    case AuthActionsTypes.LoggedIn:
      return {
        ...state,
        token: action.payload.token,
      };

    case AuthActionsTypes.SignOut:
      return {
        ...state,
        token: '',
      };

    case AuthActionsTypes.Refresh:
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
