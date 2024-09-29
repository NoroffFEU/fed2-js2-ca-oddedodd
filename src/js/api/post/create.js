import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Creates a new post.
 *
 * This function sends a POST request to the API endpoint
 * to create a new post using the provided `postData`. If the post is successfully created,
 * it shows a success alert and redirects the user to the home page.
 * If the creation fails, an error message is logged to the console.
 *
 * @param {Object} postData - The data for the post to be created.
 * @param {string} postData.title - The title of the new post.
 * @param {string} postData.body - The main content/body of the new post.
 * @param {string} [postData.media] - The URL for an optional media/image associated with the post.
 * @param {string} [postData.tags] - The tags associated with the post.
 */

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
  alert("Post created successfully!");
  window.location.href = "/";
}
