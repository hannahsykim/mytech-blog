
var editFormHandler = async (event) => {
  try {
      event.preventDefault();
  
      const title = document.querySelector("#new-title").value
      const body = document.querySelector("#new-body").value

      const post_id = document.querySelector(".update-btn").getAttribute("value");
  
      const response = await fetch(`/api/post/${post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          postId: post_id
        })
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      }

    } catch (err) {
      console.log(err);

    }
  };

document
  .querySelector(".update-btn")
  .addEventListener('click', editFormHandler);
 
