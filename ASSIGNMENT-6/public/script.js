function displayLogin() {
    document.getElementById('signupCard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pwd");
    const loginButton = document.getElementById("loginBtn");

    // Function to update the login button's status based on email and password input fields
    function updateLoginButtonStatus() {
        if (emailInput.value && passwordInput.value) {
            loginButton.removeAttribute("disabled");
        } else {
            loginButton.setAttribute("disabled", "true");
        }
    }

    // Call the function once at the beginning to set the initial state
    updateLoginButtonStatus();

    // Add event listeners for changes in the input fields
    emailInput.addEventListener("input", updateLoginButtonStatus);
    passwordInput.addEventListener("input", updateLoginButtonStatus);

    loginButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the form submission (if it's in a form)
        
        // Redirect to Main.html
        window.location.href = "Main.html";
    });
});

