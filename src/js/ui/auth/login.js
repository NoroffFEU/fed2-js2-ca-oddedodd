import { login } from "../../api/auth/login.js";
export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const userInput = Object.fromEntries(data.entries());
  login(userInput);
}
