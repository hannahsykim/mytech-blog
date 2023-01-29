const editBtn = document.querySelector(".edit-btn");
const editPost = document.querySelector(".edit-post");

const editFormHandler = async (event) => {
    
      //event.preventDefault();
  
      // grab the values of the title and content from input fields
      const title = document.querySelector("#title").value.trim();
      const body = document.querySelector("#body").value.trim();
      // grab the value of the blog_id from the button href
      const id = document.querySelector(".submit-btn").getAttribute("value");
  if (title && body) {
      try {
      const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          post_id: id,
          title: title,
          body: body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload("/dashboard");
      }
    } catch (err) {
      console.log(err);
     
    }
  };
};  

  if (editBtn) {
    const post_id = editBtn.dataset.id;
    editBtn.addEventListener("click", () => {
        editFormHandler(post_id);
        });
    }; 
