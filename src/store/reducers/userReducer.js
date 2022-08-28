import UserService from "../../services/UserService";

const INITAL_STATE = {
  user: { ...UserService.getEmptyUser() }
};

export function userReducer(state = INITAL_STATE, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        user: {
          ...state.user,
          ...action.user
        }
      };
    default:
      return state;
  }
}
