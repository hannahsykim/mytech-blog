var deleteFormHandler = async (event) => {
    try {
      event.preventDefault();
    
      const post_id = document.querySelector(".delete-btn").getAttribute("value");

      const response = await fetch(`/api/post/${post_id}`, {
        method: "DELETE",
        body: JSON.stringify({
          postId: post_id
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      }
    } catch (err) {
      console.log(err);
      
    }
  };
  
  document
    .querySelector(".delete-btn")
    .addEventListener("click", deleteFormHandler);