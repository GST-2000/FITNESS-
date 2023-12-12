function submitFeedback() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var feedback = document.getElementById('feedback').value;

    var reviewContainer = document.getElementById('feedback-list');

    // Display the feedback as a review
    var reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.innerHTML = '<strong>' + name + '</strong> (' + email + '):<br>' + feedback;

    reviewContainer.appendChild(reviewElement);

    // Display success message
    alert('Feedback submitted successfully!');

    // Clear the form
    document.getElementById('feedbackForm').reset();
}