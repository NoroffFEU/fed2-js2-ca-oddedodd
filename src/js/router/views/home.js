import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { readPosts } from "../../api/post/read";
const form = document.forms.logout;

form.addEventListener("submit", setLogoutListener);

authGuard();
readPosts();
