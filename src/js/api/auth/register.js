import { API_AUTH_REGISTER } from "../constants";

export async function register(name, email, password) {
  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    console.log("User registered");
  } else {
    console.log("Error registering user");
  }

  const data = await response.json();
  console.log(data);
}
