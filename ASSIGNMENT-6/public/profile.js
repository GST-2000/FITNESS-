function submitProfileForm(event) {
    event.preventDefault(); // Prevents the default form submission

    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var dob = document.getElementById('dob').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var bmi = document.getElementById('bmi').value;
    var goals = document.getElementById('goals').value;

    // You can add additional validation logic here if needed

    document.getElementById('saveBtn').disabled = true; // Disable the save button to prevent duplicate submissions

    sendDataToServer({
        name: name,
        age: age,
        dob: dob,
        height: height,
        weight: weight,
        bmi: bmi,
        goals: goals
    });
}

function sendDataToServer(data) {
    fetch('/submit-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert('User Profile Saved successfully!');
        // Redirect or update UI accordingly
        // For example, redirect to a profile page or show a success message
        // Remember to re-enable the save button if needed
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('saveBtn').disabled = false; // Re-enable the save button in case of error
    });
}

document.getElementById('profileForm').addEventListener('submit', submitProfileForm);
