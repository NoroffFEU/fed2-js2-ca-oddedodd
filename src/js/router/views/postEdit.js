import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";
import { readPostEdit } from "../../api/post/read";

authGuard();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const form = document.forms.editPost;

form.addEventListener("submit", onUpdatePost);
readPostEdit(id);
