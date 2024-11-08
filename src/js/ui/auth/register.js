import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const userInput = Object.fromEntries(data.entries());

  register(userInput.name, userInput.email, userInput.password);
}
