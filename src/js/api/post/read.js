import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";
const postsContainer = document.querySelector(".posts-container");

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
  console.log(result);

  postsContainer.innerHTML = "";

  let mediaUrl = "";
  if (result.data.media) {
    mediaUrl = `<img src="${result.data.media.url}" alt="${result.data.media.alt}" class="post-image">`;
  }
  postsContainer.innerHTML += `
  <div class="post-container">
    <h1>${result.data.title}</h1> 
    <p>${result.data.body}</p>
    ${mediaUrl}
    <p class="author-small-text"><em>by: ${result.data.author.name}</em></p>
  </div>
`;
}

export async function readPosts(limit = 12, page = 1, tag) {
  if (limit) {
    console.log(`Limit is ${limit}`);
  }
  const response = await fetch(API_SOCIAL_POSTS + `/?_author=true`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  postsContainer.innerHTML = "";
  for (let i = 0; i < result.data.length; i++) {
    console.log(result.data[i]);

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

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
