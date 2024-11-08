import { onLogin } from "../../ui/auth/login";

const form = document.forms.login;

/**
 * Attaches a submit event listener to the login form.
 *
 * Triggers the `onLogin` function when the form is submitted.
 */
form.addEventListener("submit", onLogin);
