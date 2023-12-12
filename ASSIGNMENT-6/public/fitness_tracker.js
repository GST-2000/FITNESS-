// Retrieve stored entries from local storage or initialize an empty array
let fitnessEntries = JSON.parse(localStorage.getItem('fitnessEntries')) || [];

function saveToLocalStorage(entries) {
    localStorage.setItem('fitnessEntries', JSON.stringify(entries));
}

function displayEntries() {
    const entriesContainer = document.getElementById('entriesContainer');

    // Clear existing entries
    entriesContainer.innerHTML = '';

    if (fitnessEntries.length === 0) {
        entriesContainer.innerHTML = '<p>No entries available.</p>';
        return;
    }

    fitnessEntries.forEach((entry, index) => {
        const entryContainer = document.createElement('div');
        entryContainer.className = 'entry-container';
        entryContainer.innerHTML = `
            <p class="entry">${index + 1}. <strong>Exercise Type:</strong> ${entry.exerciseType}</p>
            <p class="entry"><strong>Duration:</strong> ${entry.duration} minutes</p>
            <p class="entry"><strong>Date:</strong> ${entry.date}</p>
            <p class="entry"><strong>Notes:</strong> ${entry.notes || 'N/A'}</p>
        `;
        entriesContainer.appendChild(entryContainer);
    });
}

function submitForm() {
    // Get form values
    const exerciseType = document.getElementById('exerciseType').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    // Validate form inputs
    if (!exerciseType || !duration || !date) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create an entry object
    const entry = {
        exerciseType: exerciseType,
        duration: duration,
        date: date,
        notes: notes,
    };

    // Add entry to the array
    fitnessEntries.push(entry);

    // Save the updated array to local storage
    saveToLocalStorage(fitnessEntries);

    // Clear the form
    document.getElementById('fitnessForm').reset();

    // Display entries
    displayEntries();

    alert('Entry added successfully!');
}

// Call displayEntries function to show entries on page load
displayEntries();