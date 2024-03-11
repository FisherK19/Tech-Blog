async function signupFormHandler(event) {
    event.preventDefault();

    // Get data from the form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        try {
            // Send a POST request to the signup endpoint
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the response is okay (status code 200-299)
            if (response.ok) {
                // Redirect to the dashboard after successful signup
                document.location.replace('/dashboard');
            } else {
                // Display an error message if signup was unsuccessful
                alert('Failed to sign up. Please try again.');
            }
        } catch (error) {
            // Display an error message if an unexpected error occurred
            console.error('Error signing up:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    } else {
        // Display an error message if username or password is missing
        alert('Username and password are required.');
    }
}

// Add an event listener to the signup form for handling form submission
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
