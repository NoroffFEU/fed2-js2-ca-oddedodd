import { headers } from "../../api/headers";
import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

readPost(id);
