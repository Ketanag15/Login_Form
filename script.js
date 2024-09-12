document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Clear previous error messages
    document.getElementById('email-error').innerText = '';
    document.getElementById('password-error').innerText = '';

    let isValid = true;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').innerText = 'Invalid email format.';
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById('password-error').innerText = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (isValid) {
        // Show loading spinner
        document.getElementById('loading-spinner').style.display = 'block';

        // Make API call (mock API in this case)
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // Hide loading spinner
            document.getElementById('loading-spinner').style.display = 'none';

            // Store the email and password in localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            // Redirect to the success page
            window.location.href = 'success.html';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loading-spinner').style.display = 'none';
            alert('Login failed. Please try again.');
        });
    }
});

// Show/hide password functionality
document.getElementById('show-password').addEventListener('change', function () {
    const passwordInput = document.getElementById('password');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});
