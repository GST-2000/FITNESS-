function redirectTosignUp() {
    window.location.href = 'signup.html';
}

function submitLoginForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'Main.html'; // Redirect to the next page
        } else {
            alert('Incorrect credentials'); // Show alert for incorrect credentials
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return false; // Prevent default form submission
}
