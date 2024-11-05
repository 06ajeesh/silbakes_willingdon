form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent normal form submission
  
    const loading = form.querySelector('.loading');
    const errorMessage = form.querySelector('.error-message');
    
    // Show loading message
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
  
    const formData = new FormData(form);
  
    // Check if the date is empty and add a default value if needed
    const date = formData.get('date');
    if (!date) {
      formData.set('date', 'No date provided');  // You can set any default value you want
    }
  
    // Submit the form using fetch (AJAX)
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())  // Expecting JSON response
    .then(data => {
      loading.style.display = 'none';
      if (data.success) {
        // On success, redirect to another page (e.g., thank-you page)
        window.location.href = "thank-you.html"; // Redirect to custom page
      } else {
        // On error, show error message
        errorMessage.style.display = 'block';
      }
    })
    .catch(error => {
      // In case of an error (e.g. network failure)
      loading.style.display = 'none';
      errorMessage.style.display = 'block';
    });
  });
  