document.querySelector(".comment-btn").addEventListener("submit", async (event) => {

    event.preventDefault();
  
    const commentArea = document.querySelector(".comment-input").value
    const post_id = document.querySelector(".postId").value
  
      const response = await fetch(`/dashboard/${id}`, {
        method: "POST",
        body: JSON.stringify({ post_id, commentArea }),
        headers: { "Content-Type": "application/json" },
      });
      
      console.log(response);

      if (response.ok) {
        document.location.reload();
        //console.log("Comment posted");
      } else {
        alert("Failed to post comment");
        //console.log("Comment failed to post");
      }
    });
  