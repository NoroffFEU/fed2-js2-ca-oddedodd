import { updatePost } from "../../api/post/update";
export async function onUpdatePost(event) {
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

  updatePost(userInput.postid, payLoad);
}
