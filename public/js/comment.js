
const commentFormHandler = async (event) => {

    event.preventDefault();
  
    const commentArea = document.querySelector(".comment-input").value.trim();
  
    const post_id = document.querySelector("#postId").textContent;
  
    if (commentArea) {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        body: JSON.stringify({ post_id, commentArea }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
        console.log("Comment posted");
      } else {
        alert("Failed to post comment");
        console.log("Comment failed to post");
      }
    }
  };
  
  document
    .querySelector(".comment-btn")
    .addEventListener("submit", commentFormHandler);