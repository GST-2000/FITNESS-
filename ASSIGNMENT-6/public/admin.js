function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Hardcoded credentials
    var hardcodedUsername = 'admin';
    var hardcodedPassword = 'admin123';

    if(username == hardcodedUsername && password == hardcodedPassword) {
        alert('Login successful');
        // Redirect to another page or perform some action
        window.location.href = 'Main.html';
    } else {
        alert('Invalid username or password');
    }
}
function fetchData(endpoint) {
return fetch(endpoint)
.then(response => response.json())
.catch(error => console.error('Error:', error));
}

function displayData(data, containerId) {
const container = document.getElementById(containerId);
data.forEach(item => {
const itemElement = document.createElement('div');
itemElement.innerHTML = JSON.stringify(item); // Format this as per your data structure
container.appendChild(itemElement);
});
}

document.addEventListener('DOMContentLoaded', () => {
fetchData('/fetch-users').then(users => displayData(users, 'usersContainer'));
fetchData('/fetch-profiles').then(profiles => displayData(profiles, 'profilesContainer'));
fetchData('/fetch-appointments').then(appointments => displayData(appointments, 'appointmentsContainer'));
});
