import { headers } from "../../api/headers";
import { readPost } from "../../api/post/read";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// alert("Single Post Page");
readPost(id);
