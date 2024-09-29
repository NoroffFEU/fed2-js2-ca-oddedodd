import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Deletes a post by ID.
 *
 * Asks the user to confirm the deletion before sending a DELETE request to the
 * API endpoint. If the deletion is successful, displays a success message and
 * redirects the user to the home page. If the deletion fails, logs an error
 * @param {string|number} id - The ID of the post to delete.
 */
export async function deletePost(id) {
  if (!confirm("Are you sure you want to delete this post?")) {
    return;
  }

  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });

  if (response.ok) {
    alert("Post deleted successfully!");
    window.location.href = "/";
  } else {
    console.error(
      `Failed to delete post. Error: ${response.status} ${response.statusText}`
    );
    alert("Error deleting post...");
  }
}
