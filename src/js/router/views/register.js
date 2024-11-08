import { onRegister } from "../../ui/auth/register";

/**
 * Sets up the registration page.
 *
 * - Adds a submit event listener to the registration form.
 * - Calls `onRegister` when the form is submitted.
 */
const form = document.forms.register;

form.addEventListener("submit", onRegister);
