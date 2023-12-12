document.getElementById('email').addEventListener('input', function() {
    var emailField = document.getElementById('email');
    var message = document.getElementById('email-message');
    if (emailField.validity.typeMismatch) {
        message.textContent = 'Please enter a valid email address.';
    } else {
        message.textContent = '';
    }
});

document.getElementById('service').addEventListener('change', function() {
    var serviceInfo = document.getElementById('service-info');
    switch (this.value) {
        case 'personal_training':
            serviceInfo.textContent = 'Personal Training: One-on-one training sessions...';
            break;
        case 'group_class':
            serviceInfo.textContent = 'Group Class: Engage in group activities...';
            break;
        case 'nutrition_consultation':
            serviceInfo.textContent = 'Nutrition Consultation: Personalized diet plans...';
            break;
        default:
            serviceInfo.textContent = '';
    }
});

function submitAppointmentForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var date = document.getElementById('date').value;
    var service = document.getElementById('service').value;

    // Add any additional validations if needed

    sendDataToServer({
        name: name,
        email: email,
        date: date,
        service: service
    });

    return false; // Prevents the default form submission
}

function sendDataToServer(data) {
    fetch('/submit-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert('Appointment booked successfully!');
        // Handle post-submission behavior here, like showing a success message
        // or redirecting to another page
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


