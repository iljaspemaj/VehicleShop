document.querySelector(".contact-us-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.querySelector(".contact-us-form input[type='email']").value.trim();

    const data = {
        email: email
    };

    // Store the email in localStorage
    localStorage.setItem("formSubmission", JSON.stringify(data));

    // Display the success message
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";

    // Hide the message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 5000); // 5000 milliseconds = 5 seconds
});