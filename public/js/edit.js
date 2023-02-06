
const editFormHandler = async (event) => {
      event.preventDefault();
  
      // grab the values of the title and content from input fields
      const title = document.querySelector("#new-title").value
      const body = document.querySelector("#new-body").value
      const id = document.querySelector(".submit-btn").getAttribute("value");
  if (title && body) {
      try {
      const response = await fetch('/api/post/', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          title: title,
          body: body,
        })
      });
  
      if (response.ok) {
        document.location.reload('/dashboard');
      }
    } catch (err) {
      //console.log(err);

    }
  };
};  



document
  .querySelector(".submit-btn")
  .addEventListener("submit", editFormHandler);
  
 
