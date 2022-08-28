import HttpService from "./HttpService";

function getEmptyUser() {
  return {
    username: "",
    email: "",
    password: ""
  };
}

async function loginWithCookie() {
  try {
    const user = await HttpService.post("auth/login", null);
    return user;
  } catch (e) {
    console.log("not logged");
  }
}

async function getUser() {
  let user = await loginWithCookie();
  return user || getEmptyUser();
}

async function updateUser(user) {
  try {
    const res = await HttpService.put(`user/${user._id}`, user);
    return res;
  } catch (e) {
    console.log("Error while updating user, Error:", e);
    throw e;
  }
}

async function addNewContact(user) {
  try {
    const res = await HttpService.put(`user/add-contact`, user);
    return res;
  } catch (e) {
    console.log("Error while updating user, Error:", e);
    throw e;
  }
}

async function logout() {
  try {
    const user = await HttpService.post("auth/logout", null);
    if (user.error) return false;
    return user;
  } catch (e) {
    console.log("not logged");
  }
}

async function login(user) {
  try {
    const res = await HttpService.post("auth/login", user);
    return res;
  } catch (e) {
    throw e;
  }
}

export default {
  logout,
  login,
  updateUser,
  getEmptyUser,
  addNewContact,
  getUser
};
