// grab the value of the blog_id from the button href
const deleteBtn = document.querySelector(".delete-btn")
const deletePost = document.querySelector(".delete-post")

const deleteFormHandler = async (event) => {
    try {
      //event.preventDefault();
    
      const post_id = document.querySelector(".delete-btn").getAttribute("value");
      const response = await fetch(`/api/post/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          post_id
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