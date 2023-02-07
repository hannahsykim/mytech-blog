var commentFormHandler = async (event) => {
  //event.preventDefault();
  const postId = document.querySelector(".comment-btn").getAttribute("value");
  const textArea = document.querySelector("#textArea");
 
  const response = await fetch('/api/comments', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        body: textArea.value,
        postId: postId,
      }),
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  };


document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);