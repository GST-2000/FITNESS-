// Function to redirect to Details.html
function redirectToDetails() {
    window.location.href = 'Details.html';
}

// Function to handle row selection
function selectRow(row) {
    if (row.classList.contains('selected')) {
        row.classList.remove('selected');
        return;
    }

    const previouslySelected = document.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }

    row.classList.add('selected');
}

// Function to accept the selected appointment
function acceptAppointment() {
    const selectedRow = document.querySelector('.selected');
    if (!selectedRow) {
        alert('No appointment selected!');
        return;
    }

    // Code to update the appointment status (you can modify this part as needed)
    // For example, send a request to the server to update the status.
    alert('The appointment has been accepted.');

    // Reset the selected row
    selectedRow.classList.remove('selected');
}

// Function to delete the selected appointment
function deleteAppointment() {
    const selectedRow = document.querySelector('.selected');
    if (!selectedRow) {
        alert('No appointment selected!');
        return;
    }

    if (confirm('Are you sure you want to delete this appointment?')) {
        // Code to delete the appointment (you can modify this part as needed)
        // For example, send a request to the server to delete the appointment.
        selectedRow.remove();
        alert('The appointment was deleted successfully.');

        // Reset the selected row
        selectedRow.classList.remove('selected');
    }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Fetching appointments
    fetch('http://localhost:3000/get-appointments')
        .then(response => response.json())
        .then(appointments => {
            const tableBody = document.getElementById('appointments-table').querySelector('tbody');
            appointments.forEach(appointment => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = appointment.name;
                row.insertCell().textContent = appointment.email;
                row.insertCell().textContent = appointment.appointment_date;
                row.insertCell().textContent = appointment.service;
            });
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
            const tableBody = document.getElementById('appointments-table').querySelector('tbody');
            const row = tableBody.insertRow();
            const cell = row.insertCell();
            cell.textContent = 'Error loading appointments.';
            cell.className = 'error-message';
            cell.colSpan = 4;
        });

    let selectedRow = null;
    let selectionMode = false;

    const tableBody = document.getElementById('appointments-table').querySelector('tbody');
    tableBody.addEventListener('click', function (event) {
        if (selectionMode && event.target.tagName === 'TD') {
            selectRow(event.target.parentElement);
            selectionMode = false;
        }
    });

    const selectButton = document.getElementById('selectButton');
    selectButton.addEventListener('click', function () {
        selectionMode = true;
    });

    const acceptButton = document.getElementById('acceptButton');
    acceptButton.addEventListener('click', acceptAppointment);

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', deleteAppointment);
});