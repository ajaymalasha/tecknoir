document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.php-email-form');
    
    // Initialize EmailJS with your public key
    emailjs.init("1PPkyQwIYBO2uMDG_");
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const loading = form.querySelector('.loading');
        const errorMessage = form.querySelector('.error-message');
        const sentMessage = form.querySelector('.sent-message');
        
        // Show loading
        loading.style.display = 'block';
        submitButton.disabled = true;
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';
        
        // Get form data
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const subject = form.querySelector('input[name="subject"]').value;
        const message = form.querySelector('textarea[name="message"]').value;
        
        // Get current time
        const now = new Date();
        const time = now.toLocaleString();
        
        console.log("Sending email with data:", {
            title: subject,
            name: name,
            email: email,
            time: time,
            message: message
        });
        
        // Send notification email to admin (you)
        const adminEmailPromise = emailjs.send("service_huaa587", "template_x20uxbp", {
            title: subject,
            name: name,
            email: email,
            time: time,
            message: message
        });
        
        // Send auto-reply to the sender using the new template
        const autoReplyPromise = emailjs.send("service_huaa587", "template_0uxqurh", {
            name: name,
            email: email,
            title: subject
        });
        
        // Handle both email promises
        Promise.all([adminEmailPromise, autoReplyPromise])
            .then(function(responses) {
                console.log("Emails sent successfully:", responses);
                loading.style.display = 'none';
                submitButton.disabled = false;
                sentMessage.style.display = 'block';
                form.reset();
            })
            .catch(function(error) {
                console.error("EmailJS Error Details:", error);
                loading.style.display = 'none';
                submitButton.disabled = false;
                errorMessage.textContent = 'An error occurred: ' + (error.text || error.message || 'Unknown error');
                errorMessage.style.display = 'block';
            });
    });
}); 