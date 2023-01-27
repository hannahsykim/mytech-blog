const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const commentArea = document.querySelector("#comment-input").value.trim();
  
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    //   if (content) prevents users from submitting empty comments
    if (commentArea) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ post_id, commentArea }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);