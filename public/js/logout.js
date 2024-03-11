async function logout() {
    try {
        // Send a POST request to the logout endpoint
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the request was successful
        if (response.ok) {
            // Redirect to the home page after successful logout
            document.location.replace('/');
        } else {
            // Display an error message if the logout was unsuccessful
            alert('Failed to log out. Please try again.');
        }
    } catch (error) {
        // Display an error message if an unexpected error occurred
        console.error('Error logging out:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}

// Add an event listener to the logout button for handling click events
document.querySelector('#logout').addEventListener('click', logout);
