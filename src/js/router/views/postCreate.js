import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
authGuard();

const form = document.forms.createPost;

/**
 * Sets up the create post page.
 *
 * - Runs `authGuard` to check if the user is logged in.
 * - Hooks up the submit event on the create post form to `onCreatePost`.
 */
form.addEventListener("submit", onCreatePost);
