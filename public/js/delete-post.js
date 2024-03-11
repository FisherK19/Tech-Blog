async function deletePostHandler(event) {
    event.preventDefault();

    // Extract the post ID from the current URL
    const postId = window.location.pathname.split('/').pop();

    try {
        // Send a DELETE request to delete the post
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the request was successful
        if (response.ok) {
            // Redirect to the dashboard page after successful deletion
            document.location.replace('/dashboard');
        } else {
            // Display an error message if the request was not successful
            alert('Failed to delete the post');
        }
    } catch (error) {
        // Display an error message if an unexpected error occurred
        console.error(error);
        alert('An error occurred while deleting the post');
    }
}

// Add an event listener to the delete post button for handling click events
document.querySelector('.delete-post-btn').addEventListener('click', deletePostHandler);
