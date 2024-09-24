import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const payload = Object.fromEntries(data.entries());
  console.log(payload.name);
  let name = payload.name;
  let email = payload.email;
  let password = payload.password;
  let bio = "";
  let banner = "";
  let avatar = "";
  register({ name, email, password, bio, banner, avatar });
}
