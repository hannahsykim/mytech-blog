document.querySelector(".comment-btn").addEventListener("submit", async (event) => {

    event.preventDefault();
  
    const commentArea = document.querySelector(".comment-input").value;
    // const post_id = document.querySelector(".postId").value;
  
      const response = await fetch(`/api/comment`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          body: commentArea
        }),
        
      });
      
      console.log(response);

      if (response.ok) {
        document.location.replace('/dashboard');
        //console.log("Comment posted");
      } else {
        alert("Failed to post comment");
        //console.log("Comment failed to post");
      }
    });
  