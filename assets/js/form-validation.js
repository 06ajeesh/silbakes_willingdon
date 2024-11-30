// Select both forms by their unique IDs
const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');

// Function to handle form submission
function handleFormSubmission(formId) {
  // Grab the form and the necessary elements for the specific form
  const form = document.querySelector(`#${formId}`);
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

          // Check for Form 1 specific fields (phone, date)
          if (formId === 'form1') {
            const phone = formData.get('phone') || 'N/A';
            const date = formData.get('date') || 'N/A';
            confirmationDetails.innerHTML += `
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Date:</strong> ${date}</li>
            `;
          }

          // Reset the form after successful submission
          form.reset();

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
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
}

// Call the function for both forms
handleFormSubmission('form1'); // For the first form
handleFormSubmission('form2'); // For the second form

// Ensure the forms reset when the page is loaded
window.onload = function () {
  const form1 = document.querySelector('#form1');
  const form2 = document.querySelector('#form2');
  
  if (form1) form1.reset(); // Reset the first form
  if (form2) form2.reset(); // Reset the second form
};
