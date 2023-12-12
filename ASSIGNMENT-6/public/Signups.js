document.addEventListener('DOMContentLoaded', function() {
    // Fetch data and populate the table
fetch('http://localhost:3000/get-signup-info')
.then(response => response.json())
.then(data => {
    const tableBody = document.getElementById('signup-table').getElementsByTagName('tbody')[0];
    data.forEach(item => {
        const row = tableBody.insertRow();
        row.setAttribute('data-email', item.Email);
        row.insertCell(0).textContent = item.Name;
        row.insertCell(1).textContent = item.Username;
        row.insertCell(2).textContent = item.Email;
        row.insertCell(3).textContent = item.Password; // Consider the security of showing passwords
        
        // Attach event listener to the row
        row.addEventListener('click', () => selectRow(row));
    });
})
.catch(error => {
    console.error('Error:', error);
}); 

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

    // Function to delete the selected user
    function deleteUser() {
        const selectedRow = document.querySelector('.selected');
        if (!selectedRow) {
            alert('No user selected!');
            return;
        }
        const userEmail = selectedRow.getAttribute('data-email');

        fetch('/delete-user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: userEmail })
        })
        .then(response => response.text())
        .then(message => {
            alert(message); // Popup message
            selectedRow.remove(); // Remove the row from the table
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Attach event listeners to buttons
    const selectButton = document.querySelector('.select');
    const deleteButton = document.querySelector('.delete');

    if (selectButton) {
        selectButton.addEventListener('click', () => {
            document.querySelectorAll('#signup-table tbody tr').forEach(row => {
                row.addEventListener('click', () => selectRow(row));
            });
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', deleteUser);
    }
});
