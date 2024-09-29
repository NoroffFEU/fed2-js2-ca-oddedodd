import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost(postData) {
  // console.log(postData);

  const response = await fetch(API_SOCIAL_POSTS, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    console.log("Error creating post");
  }

  const data = await response.json();

  console.log("Post created: " + data);
}
