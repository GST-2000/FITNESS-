document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/get-user-profiles')
    .then(response => response.json())
    .then(profiles => {
        const tableBody = document.getElementById('profiles-table').getElementsByTagName('tbody')[0];
        profiles.forEach(profile => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = profile.id;
            row.insertCell(1).textContent = profile.name;
            row.insertCell(2).textContent = profile.age;
            row.insertCell(3).textContent = profile.dob;
            row.insertCell(4).textContent = profile.height;
            row.insertCell(5).textContent = profile.weight;
            row.insertCell(6).textContent = profile.bmi;
            row.insertCell(7).textContent = profile.fitness_goals;
            // Add more cells as per your data structure
        });
    })
    .catch(error => {
        console.error('Error:', error);
        const tableBody = document.getElementById('profiles-table').getElementsByTagName('tbody')[0];
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = 'Error loading profiles';
        cell.colSpan = 7; // Adjust the colspan as per the number of columns
    });
});
