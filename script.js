const messageTextFieldEl = document.getElementById("message"); // this is text field

const publishBtnEl = document.getElementById("publish"); // this is button
const messagesContainerEl = document.getElementById("messages");

// const deleteBtnEl = document.querySelectorAll(".message:hover .delete-btn");
//publish message
publishBtnEl.addEventListener("click", function () {
  deployNewmessage();
});

//function for creating new messages
function createNewmessage(message) {
  let newMessage = document.createElement("div"); // creating div for new message
  newMessage.classList.add("message"); // adding classname for predefined style
  newMessage.textContent = message; // inserting message in the message div
  messagesContainerEl.appendChild(newMessage); // inserting the whole new div into the container

  // creating delete button
  let newDeleteBtn = document.createElement("button");
  newDeleteBtn.classList.add("delete-btn");
  newDeleteBtn.innerHTML = "<img src='images/Trash.png'/> ";
  newMessage.appendChild(newDeleteBtn);
  newDeleteBtn.addEventListener("click", function () {
    console.log("clicked");
    newMessage.textContent = "Damn";
  });

  // reseting textarea empty
  resetText(messageTextFieldEl);
}
// new message deploy function
function deployNewmessage() {
  let textMessage = messageTextFieldEl.value; //getting value from textarea
  // checking whether textfiled is empty or not
  if (textMessage !== "") {
    createNewmessage(textMessage);
  } else {
    alert("no message yet");
  }
}
// function for reset
function resetText(element) {
  element.value = "";
}

// deleteBtnEl.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     console.log("clicked");
//   });
// });

// enter keydown function
messageTextFieldEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    deployNewmessage();
  }
});

// messageDiv.addEventListener('click', (event) => {
//   if (event.target.classList.contains('delete-btn')) {
//     console.log('Button clicked!');
//   }
// });
