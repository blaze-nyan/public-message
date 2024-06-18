const messageTextFieldEl = document.getElementById("message-text"); // this is text field
const publishBtnEl = document.getElementById("publish"); // this is button
const messagesContainerEl = document.getElementById("messages");
let key = 0;
const messagesArray = [];

publishBtnEl.addEventListener("click", deployNewmessage);

//function for creating new messages
function createNewmessage() {
  let newMessage = ``;
  for (let message of messagesArray) {
    newMessage += `
      <div class="message" id=${message.key}>
        <span>${message.textMessage} </span>
        <button class="delete-btn" data-message=${message.key}>
          <i class="fa-solid fa-trash-can" data-message=${message.key}></i>
        </button>
      </div>`;
  }
  return newMessage;
}

// new message deploy function
function deployNewmessage() {
  let userMessage = messageTextFieldEl.value;
  textMessage = userMessage.trim();
  if (textMessage !== "") {
    console.log(textMessage);
    resetText(messageTextFieldEl); //getting value from textarea
    // checking whether textfiled is empty or not

    messagesArray.push({ key, textMessage });
    key++;
    render();
  } else {
    resetText(messageTextFieldEl);
    alert("no message yet");
  }
}
// function for reset
function resetText(element) {
  element.value = "";
}

function render() {
  if (messagesArray[0]) {
    messagesContainerEl.innerHTML = "";
    messagesContainerEl.innerHTML = createNewmessage();
  } else {
    messagesContainerEl.innerHTML = "";
  }
}

// enter keydown function
messageTextFieldEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    deployNewmessage();
  }
});

//testing

document.addEventListener("click", function (e) {
  let exactMessageIndex;
  if (e.target.dataset.message) {
    messagesArray.forEach(function (message) {
      if (e.target.dataset.message == message.key) {
        exactMessageIndex = messagesArray.indexOf(message);
        messagesArray.splice(exactMessageIndex, 1);
        console.log(messagesArray);
        render();
      }
    });
  }
});
