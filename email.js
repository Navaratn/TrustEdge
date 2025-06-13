document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusDiv.textContent = '';
    
    const templateParams = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    emailjs.send('service_fm78njp', 'template_poqz7kp', templateParams)
      .then(function() {
        statusDiv.textContent = 'Message sent successfully!';
        statusDiv.style.color = 'green';
        document.getElementById('contact-form').reset();
      }, function(error) {
        statusDiv.textContent = 'Failed to send message. Please try again.';
        statusDiv.style.color = 'red';
        console.error('EmailJS error:', error);
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
  });