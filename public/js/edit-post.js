async function editPostHandler(event) {
    event.preventDefault();

    // Extract the post ID from the current URL
    const post_id = window.location.pathname.split('/').pop();

    // Get the updated post title and body from the form inputs
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('textarea[name="body"]').value.trim();

    try {
        // Send a PUT request to update the post
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the request was successful
        if (response.ok) {
            // Redirect to the dashboard page after successful update
            document.location.replace('/dashboard');
        } else {
            // Display an error message if the request was not successful
            alert('Failed to update the post');
        }
    } catch (error) {
        // Display an error message if an unexpected error occurred
        console.error(error);
        alert('An error occurred while updating the post');
    }
}

// Add an event listener to the edit post form for handling submit events
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.edit-post-form').forEach(form => {
        form.addEventListener('submit', editPostHandler);
    });
});
