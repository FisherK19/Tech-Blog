async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();
    const post_id = window.location.toString().split('/').pop();

    if (comment_text) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ post_id, comment_text }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to add a new comment');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while adding a new comment');
        }
    } else {
        alert("Please enter a comment.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('#new-comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', commentFormHandler);
    } else {
        console.error('Comment form not found');
    }
});
