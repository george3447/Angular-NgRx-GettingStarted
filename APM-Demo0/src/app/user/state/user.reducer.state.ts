import { createFeatureSelector, createSelector } from "@ngrx/store";

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
}

export function userReducer(state = initialUserState, action): UserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
};


