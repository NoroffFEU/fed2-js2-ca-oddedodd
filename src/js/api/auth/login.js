import { API_AUTH_LOGIN } from "../constants";
/**
 * Logs in a user using the provided email and password.
 *
 * Sends a POST request to the `API_AUTH_LOGIN` endpoint with the user's
 * credentials. If the login is successful, stores the access token and
 * username in local storage and redirects the user to the home page.
 * If the login fails, logs an error message to the console.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
export async function login({ email, password }) {
  const response = await fetch(API_AUTH_LOGIN, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const userData = await response.json();
    const userInfo = userData.data;
    localStorage.setItem("token", userInfo.accessToken);
    localStorage.setItem("username", userInfo.name);

    window.location.href = "/";
  } else {
    console.log("Error logging in user");
  }
}
