function submitSignUpForm() {
    var name = document.getElementById('name').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPwd').value;
    var termsCheck = document.getElementById('termsCheck').checked;

    if (!termsCheck) {
        alert('Please agree to the Terms of Service, Privacy Policy, and Notification Settings.');
        return false; // Stops the form submission
    }

    sendDataToServer({
        name: name,
        username: username,
        email: email,
        password: password
    });

    return true; // Proceed with form submission
}

function sendDataToServer(data) {
    fetch('/submit-signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        window.location.href = 'login.html'; // Redirect after successful signup
    })
    .catch(error => {
        console.error('Error:', error);
    });
}