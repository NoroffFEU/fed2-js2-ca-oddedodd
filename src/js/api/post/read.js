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
  console.log(result.data);
  let mediaUrl = "";
  if (result.data.media) {
    mediaUrl = `<img src="${result.data.media.url}" alt="${result.data.media.alt}" class="w-full">`;
  }
  let avatarUrl = "";
  if (result.data.author.avatar) {
    avatarUrl = `<img src="${result.data.author.avatar.url}" alt="${result.data.author.avatar.alt}" class="rounded-full w-4">`;
  }

  let editDeleteLink = "";
  if (loggedInUser === result.data.author.name) {
    editDeleteLink = `
    <p><a href="/post/edit/?id=${result.data.id}" class="bg-blue-500 text-white w-full sm:w-auto text-center px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">Edit post</a> <a href="#" id="delete-post-link" data-id="${result.data.id}" class="bg-red-500 text-white w-full sm:w-auto text-center px-4 py-2 rounded-md shadow hover:bg-red-600 transition">Delete post</a></p>
    `;
  }
  postsContainer.innerHTML += `
  <div class="post-container bg-white p-6 rounded-lg shadow-md animate-fade-in mb-6">
    <h1 class="text-3xl font-bold break-words">${result.data.title}</h1> 
    <p class="pt-4 mb-4 break-words">${result.data.body}</p>
    <div class="mt-4 mb-4">${mediaUrl}</div>
    <div class="flex items-center space-x-2 mt-4">
      ${avatarUrl}
      <p class="text-sm italic">${result.data.author.name}</p>
      </div>
    <div class="flex items-center justify-center space-x-2 mt-4">
    ${editDeleteLink}
    </div>
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
 * - Shows each post with a link to the post page.
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
      mediaUrl = `<img src="${result.data[i].media.url}" alt="${result.data[i].media.alt}" class="post-image w-full">`;
    }
    let avatarUrl = "";
    if (result.data[i].author.avatar) {
      avatarUrl = `<img src="${result.data[i].author.avatar.url}" alt="${result.data[i].author.avatar.alt}" class="rounded-full w-4">`;
    }

    postsContainer.innerHTML += `
          <div class="post-container bg-white p-6 rounded-lg shadow-md animate-fade-in mb-6">
            <a href="/post/?id=${result.data[i].id}"><h3 class="text-3xl font-bold break-words hover:underline">${result.data[i].title}</h3></a>
            <p class="pt-4 mb-4 break-words">${result.data[i].body}</p>
            <div class="mt-4 mb-4">${mediaUrl}</div>
            <div class="flex items-center space-x-2 mt-4">
              ${avatarUrl}
              <p class="text-sm italic">${result.data[i].author.name}</p>
            </div>
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
