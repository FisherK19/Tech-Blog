async function signupFormHandler(event) {
    event.preventDefault();

    // getting data from the form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log('Success');
                document.location.replace('/dashboard');
            } else {
                console.error('Failed to sign up:', response.statusText);
                alert('Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    } else {
        alert('Username and password are required.');
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);


