import { readPost } from "../../api/post/read";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Reads a specific post using the post ID from the URL.
 *
 * - Extracts the `id` parameter from the URL query string.
 * - Calls `readPost` to fetch and display the post details.
 *
 * @example
 * // URL: https://example.com/post/?id=123
 * // Extracted ID: 123
 */
readPost(id);
