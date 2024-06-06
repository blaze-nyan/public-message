const messageTextFieldEl = document.getElementById("message"); // this is text field

const publishBtnEl = document.getElementById("publish"); // this is button
const messagesContainerEl = document.getElementById("messages");

publishBtnEl.addEventListener("click", function () {
  let textMessage = messageTextFieldEl.value; //getting value from textarea
  let newMessage = document.createElement("div"); // creating div for new message
  newMessage.classList.add("message"); // adding classname for predefined style
  newMessage.textContent = textMessage; // inserting message in the message div
  messagesContainerEl.appendChild(newMessage); // inserting the whole new div into the container
  messageTextFieldEl.value = ""; // reseting textarea empty
});
