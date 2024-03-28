async function newFormHandler(event) {
  event.preventDefault();

  const titleInput = document.querySelector('input[name="title"]').value;
  const bodyInput = document.querySelector('textarea[name="body"]').value;

  console.log('Attempting to create post:', titleInput, bodyInput);

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

  if (response.ok) {
    console.log('Post created, redirecting to homepage');
    document.location.replace('/'); 
  } else {
    alert('Failed to create post: ' + await response.text());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newPostForm = document.querySelector('#new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newFormHandler);
  } else {
    console.error('New post form not found');
  }
});

