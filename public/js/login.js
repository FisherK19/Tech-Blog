async function loginFormHandler(event) {
    event.preventDefault();

    // Get the username and password from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        try {
            // Send a POST request to the login endpoint
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the request was successful
            if (response.ok) {
                // Redirect to the dashboard page after successful login
                document.location.replace('/dashboard');
            } else {
                // Display an error message if the login was unsuccessful
                alert('Failed to log in. Please check your credentials and try again.');
            }
        } catch (error) {
            // Display an error message if an unexpected error occurred
            console.error('Error logging in:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    }
}

// Add an event listener to the login form for handling submit events
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
