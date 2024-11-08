import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";
import { deletePost } from "./delete";
const postsContainer = document.querySelector(".posts-container");
const loggedInUser = localStorage.getItem("username");

/**
 * Fetches and displays a single post by ID.
 *
 * - Redirects to the home page if no ID is provided.
 * - Shows "Edit" and "Delete" links if the logged-in user is the author.
 * - Binds the delete functionality to the "Delete" link.
 *
 * @param {string|number} id - The ID of the post to read.
 */
export async function readPost(id) {
  if (!id) {
    window.location.href = "/";
  }

  const response = await fetch(API_SOCIAL_POSTS + `/${id}?_author=true`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  postsContainer.innerHTML = "";

  let mediaUrl = "";
  if (result.data.media) {
    mediaUrl = `<img src="${result.data.media.url}" alt="${result.data.media.alt}" class="post-image">`;
  }

  let editDeleteLink = "";
  if (loggedInUser === result.data.author.name) {
    editDeleteLink = `
    <p><a href="/post/edit/?id=${result.data.id}">Edit post</a> – <a href="#" id="delete-post-link" data-id="${result.data.id}">Delete post</a></p>
    `;
  }
  postsContainer.innerHTML += `
  <div class="post-container">
    <h1>${result.data.title}</h1> 
    <p>${result.data.body}</p>
    ${mediaUrl}
    <p class="author-small-text"><em>by: ${result.data.author.name}</em></p>
    ${editDeleteLink}
  </div>
`;

  // Bind delete functionality if the user is the author of the post
  const deleteLink = document.getElementById("delete-post-link");
  if (deleteLink) {
    deleteLink.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = deleteLink.getAttribute("data-id");
      deletePost(postId);
    });
  }
}

/**
 * Fetches post data by ID and populates form fields for editing.
 *
 * @param {string|number} id - The ID of the post to read and edit.
 */
export async function readPostEdit(id) {
  if (!id) {
    window.location.href = "/";
  }

  const titleEdit = document.querySelector("#title-edit");
  const bodyEdit = document.querySelector("#body-edit");
  const tagsEdit = document.querySelector("#tags-edit");
  const mediaEdit = document.querySelector("#media-edit");
  const idEdit = document.querySelector("#id-edit");

  const response = await fetch(API_SOCIAL_POSTS + `/${id}?_author=true`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  idEdit.value = result.data.id;
  titleEdit.value = result.data.title;
  bodyEdit.value = result.data.body;
  tagsEdit.value = result.data.tags;
  mediaEdit.value = result.data.media.url;
}

/**
 * Fetches and displays a list of posts with an optional limit.
 *
 * - Stops fetching when the limit is reached.
 * - Shows each post with a link to the uniqe post page.
 *
 * @param {number} [limit=12] - Maximum number of posts to display.
 * @param {number} [page=1] - Page number for pagination (currently unused).
 * @param {string} [tag] - Tag to filter posts (currently unused).
 */
export async function readPosts(limit = 12, page = 1, tag) {
  const response = await fetch(API_SOCIAL_POSTS + `/?_author=true`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  postsContainer.innerHTML = "";
  for (let i = 0; i < result.data.length; i++) {
    let mediaUrl = "";
    if (result.data[i].media) {
      mediaUrl = `<img src="${result.data[i].media.url}" alt="${result.data[i].media.alt}" class="post-image">`;
    }

    postsContainer.innerHTML += `
          <div class="post-container">
            <a href="/post/?id=${result.data[i].id}"><h3>${result.data[i].title}</h3></a>
            <p>${result.data[i].body}</p>
            ${mediaUrl}
            <p class="author-small-text"><em>by: ${result.data[i].author.name}</em></p>
          </div>
    `;
    if (limit && i >= limit - 1) {
      break;
    }
  }
}

/**
 * Placeholder for fetching posts by a specific user.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
