import { API_AUTH_REGISTER } from "../constants";

/**
 * Register new user with the API.
 *
 * Sends a POST request to the `API_AUTH_REGISTER` endpoint with the users registration details
 * (name, email, and password) to create a new account. If the registration fails, an error message
 * is logged to the console. On success the function displays an alert and
 * redirects the user to the login page.
 *
 * @param {string} name - The name of the user to register.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the new user account.
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 */
export async function register(name, email, password) {
  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    console.log("Error registering user");
  }
  alert("User registered successfully!");
  window.location.href = "/auth/login/";
}
