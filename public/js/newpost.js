document.querySelector('#new-post').addEventListener("submit", async (event) => {
    event.preventDefault();
    const response = await fetch('/dashboard/create', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: document.querySelector('#title').value,
            body: document.querySelector('#body').value,
        })
    });

    //console.log(response);
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post'); 
        }
    });
