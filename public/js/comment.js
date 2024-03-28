// Function to handle comment form submissions
async function commentFormHandler(event) {
    // Prevent the default form submission behavior
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

// Function to handle form submissions for creating new posts
async function newFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the title and body inputs
    const titleInput = document.querySelector('input[name="title"]').value;
    const bodyInput = document.querySelector('textarea[name="body"]').value;

    // Send a POST request to create a new post
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title: titleInput,
            body: bodyInput
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the dashboard page after successful post creation
        document.location.replace('/dashboard');
    } else {
        // Display an error message if there was an issue with the request
        alert('Failed to create post: ' + await response.text());
    }
}

// Add event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the comment form
    document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

    // Attach event listener to the new post form
    document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
});

