document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  // Event listener for send button click
  sendButton.addEventListener("click", function () {
    const messageText = messageInput.value.trim(); // Get message text from input
    if (messageText !== "") {
      const message = { sender: "User", text: messageText }; // Create message object
      displayMessage(message); // Display the message in the chat
      messageInput.value = ""; // Clear the input field
    }
  });

  // Function to display a message in the chat
  function displayMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    const senderSpan = document.createElement("span");
    senderSpan.classList.add("sender");
    senderSpan.textContent = message.sender;

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("time");
    timeSpan.textContent = " - " + getCurrentTime(); // Set the current time

    const textSpan = document.createElement("span");
    textSpan.classList.add("text");
    textSpan.textContent = "\n" + message.text; // Message text on a new line

    messageDiv.appendChild(senderSpan);
    messageDiv.appendChild(timeSpan);
    messageDiv.appendChild(document.createElement("br")); // Add a line break
    messageDiv.appendChild(textSpan);

    chatContainer.prepend(messageDiv); // Use prepend instead of append
  }

  // Function to get the current time
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
  }

  // Function to generate a random interval between 1 to 3 seconds
  function getRandomInterval() {
    return Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
  }

  // Function to simulate sending a message after successful login
  function sendMessageAfterLogin() {
    const message = { sender: "Visitor has entered the chat", text: "" }; // Create message object
    displayMessage(message); // Display the message in the chat
  }

  // Simulate sending a message after successful login
  sendMessageAfterLogin();

  // Fetch and display chat messages
  fetch("messages.json") // Update the path to your JSON file
    .then((response) => response.json())
    .then((data) => {
      let index = 0;
      const sendMessageInterval = setInterval(() => {
        if (index < data.length) {
          const message = data[index];
          displayMessage(message);
          index++;
        } else {
          clearInterval(sendMessageInterval);
        }
      }, getRandomInterval());
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
    });
});
