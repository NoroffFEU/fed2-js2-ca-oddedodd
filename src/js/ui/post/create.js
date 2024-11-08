import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const userInput = Object.fromEntries(data);

  const tagsArray = userInput.tags.split(",").map((tag) => tag.trim());

  const payLoad = {
    title: userInput.title,
    body: userInput.body,
    tags: tagsArray,
    media: {
      url: userInput.media,
    },
  };

  createPost(payLoad);
}
