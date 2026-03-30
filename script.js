document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents the page from refreshing

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const statusText = document.getElementById('formStatus');

    statusText.textContent = "Sending message...";
    statusText.style.color = "blue";

    try {
        // Send data to our backend server
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, message: message })
        });

        if (response.ok) {
            statusText.textContent = "Thank you! Your message has been received.";
            statusText.style.color = "green";
            document.getElementById('contactForm').reset(); // Clear the form
        } else {
            statusText.textContent = "Oops! Something went wrong. Please try again.";
            statusText.style.color = "red";
        }
    } catch (error) {
        statusText.textContent = "Network error. Please check your connection.";
        statusText.style.color = "red";
    }
});