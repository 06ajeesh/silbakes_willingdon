// Grab the form and the necessary elements
const form = document.querySelector('.php-email-form');
const loading = form.querySelector('.loading');
const successMessage = form.querySelector('.sent-message');
const errorMessage = form.querySelector('.error-message');

// Form submit event
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission (no page reload)

  // Show loading spinner
  loading.style.display = 'block';
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  // Gather form data (FormData makes this easy)
  const formData = new FormData(form);

  // Send data to Web3Forms API using fetch
  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json()) // Expecting a JSON response
    .then((data) => {
      loading.style.display = 'none'; // Hide loading spinner

      if (data.success) {
        // On success, show the success message
        successMessage.style.display = 'block';

        // Optionally, you can populate the confirmation details dynamically
        const confirmationDetails = successMessage.querySelector('.confirmation-details');
        confirmationDetails.innerHTML = `
          <li><strong>Name:</strong> ${formData.get('name')}</li>
          <li><strong>Email:</strong> ${formData.get('email')}</li>
          <li><strong>Subject:</strong> ${formData.get('subject')}</li>
          <li><strong>Message:</strong> ${formData.get('message')}</li>
        `;

        // Reset the form after successful submission
        form.reset();

        // Optional: Redirect to a custom thank you page (uncomment if needed)
        // window.location.href = "thank-you.html";  // Redirect to custom page
      } else {
        // On failure, show error message
        errorMessage.style.display = 'block';
      }
    })
    .catch((error) => {
      // Handle network or other errors
      loading.style.display = 'none';
      errorMessage.style.display = 'block';
      console.error('Error during form submission:', error); // Log the error for debugging
    });
});

// Ensure the form resets when the page is loaded
window.onload = function () {
  if (form) {
    form.reset(); // Reset the form fields
  }
};
