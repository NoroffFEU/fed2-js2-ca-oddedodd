import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";
import { readPostEdit } from "../../api/post/read";

authGuard();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const form = document.forms.editPost;

/**
 * Sets up the edit post page.
 *
 * - Runs `authGuard` to make sure the user is logged in.
 * - Gets the post ID from the URL.
 * - Adds a submit event to the edit form, calling `onUpdatePost` when submitted.
 * - Loads the existing post data using `readPostEdit`.
 */
form.addEventListener("submit", onUpdatePost);
readPostEdit(id);
