document.addEventListener("DOMContentLoaded", function () {
  // Replace this with your actual stored password hash
  const storedPasswordHash =
    "0be64ae89ddd24e225434de95d501711339baeee18f009ba9b4369af27d30d60";

  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("password");
  const loginMessage = document.getElementById("login-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();
    if (!enteredPassword) {
      loginMessage.textContent = "Please enter a password.";
      return;
    }

    const enteredPasswordHash = sha256(enteredPassword);

    // Log the entered password hash and the stored password hash for debugging
    console.log("Entered password hash:", enteredPasswordHash);
    console.log("Stored password hash:", storedPasswordHash);

    // Compare the entered password hash with the stored password hash
    if (enteredPasswordHash === storedPasswordHash) {
      loginMessage.textContent = "Login successful!";
      // Redirect to chat.html after successful login
      window.location.href = "chat.html";
    } else {
      loginMessage.textContent = "Invalid password. Please try again.";
    }
  });

  function sha256(plainText) {
    // Use a SHA-256 hashing library or implementation
    // This example uses the CryptoJS library
    return CryptoJS.SHA256(plainText).toString();
  }
});
