import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export interface UserState {
  maskUserName: boolean;
}

const initialUserState: UserState = {
  maskUserName: true
};

export function userReducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}



