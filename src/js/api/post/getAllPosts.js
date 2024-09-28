import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";
const postsContainer = document.querySelector(".posts");

export async function getAllPosts(limit = "") {
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
  console.log(result.data[0].title);

  postsContainer.innerHTML = "";
  for (let i = 0; i < result.data.length; i++) {
    console.log(result.data[i]);

    let mediaUrl = "";
    if (result.data[i].media) {
      mediaUrl = `<img src="${result.data[i].media.url}" alt="${result.data[i].media.alt}" class="post-image">`;
    }

    postsContainer.innerHTML += `
          <div class="post-container">
            <a href="/post/${result.data[i].id}"><h3>${result.data[i].title}</h3></a>
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
