import { API_AUTH_LOGIN } from "../constants";

export async function login({ email, password }) {
  console.log(email, password);

  const response = await fetch(API_AUTH_LOGIN, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("profile", profile);

    window.location.href = "/";
  } else {
    console.log("Error logging in user");
  }
  const data = await response.json();
}
