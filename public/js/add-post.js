async function newFormHandler(event) {
    event.preventDefault();

    // Get values from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    try {
        // Send a POST request to create a new post
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the request was successful
        if (response.ok) {
            // Redirect to the dashboard if the post is created successfully
            document.location.replace('/dashboard');
        } else {
            // Display an error message if there was an issue with the request
            alert('Failed to create a new post');
        }
    } catch (err) {
        // Display an error message if an unexpected error occurred
        console.error(err);
        alert('An error occurred while creating a new post');
    }
}

// Add an event listener to the form for form submission
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);

