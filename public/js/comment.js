async function commentFormHandler(event) {
    event.preventDefault();

    // Get the value of the comment text input
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Extract the post_id from the current URL
    const post_id = window.location.toString().split('/').pop();

    // Check if the comment text is not empty
    if (comment_text) {
        try {
            // Send a POST request to add a new comment
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ post_id, comment_text }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the request was successful
            if (response.ok) {
                // Reload the page to display the new comment
                document.location.reload();
            } else {
                // Display an error message if there was an issue with the request
                alert('Failed to add a new comment');
            }
        } catch (error) {
            // Display an error message if an unexpected error occurred
            console.error(error);
            alert('An error occurred while adding a new comment');
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
