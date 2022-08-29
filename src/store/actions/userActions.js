import userService from "../../services/UserService";

const _setUser = user => ({ type: "SET_USER", user });

export function loadUser() {
  return async dispatch => {
    try {
      var user = await userService.getUser();
      return dispatch(_setUser(user));
    } catch (e) {
      console.log("error while trying to load user");
      return { e };
    }
  };
}

export function addContact() {
  return async (dispatch, getState) => {
    const oldUser = getState().userReducer.user;
    const newUser = await userService.addNewContact(oldUser);
    dispatch(_setUser(newUser));
  };
}
export function updateContacts(newContacts) {
  return async (dispatch, getState) => {
    const oldUser = getState().userReducer.user;
    const newUser = {
      ...oldUser,
      contacts: [...newContacts]
    };
    const userFromServer = await userService.updateUser(newUser);
    dispatch(_setUser(userFromServer));
  };
}
export function login(loginCreds) {
  return async dispatch => {
    try {
      const newUser = await userService.login(loginCreds);
      dispatch(_setUser(newUser));
      return true;
    } catch (e) {
      throw e;
    }
  };
}
