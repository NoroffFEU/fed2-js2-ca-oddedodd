import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { readPosts } from "../../api/post/read";
const form = document.forms.logout;

/**
 * Setting up the logout functionality and loading posts.
 *
 * - Adds a submit event listener to the logout form.
 * - Calls `authGuard` to check user authentication.
 * - Calls `readPosts` to display the latest posts.
 */
form.addEventListener("submit", setLogoutListener);

authGuard();
readPosts();
