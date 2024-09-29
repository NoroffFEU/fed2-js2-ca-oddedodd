import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";
/**
 * Updates an existing  post.
 *
 * This function sends a PUT request to the API endpoint to update a post
 * with the specified ID using the data provided in `postData`. If the
 * update is successful, it displays a success alert and redirects the user
 * to the updated post's page. Logs an error message if the update fails.
 *
 * @param {number|string} id - The ID of the post to update.
 * @param {Object} postData - An object containing the updated post data.
 */
export async function updatePost(id, postData) {
  console.log(API_SOCIAL_POSTS + "/" + id);

  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    console.log("Error updating post");
  }
  alert("Post updated successfully!");
  window.location.href = "/post/?id=" + id;
}
