const messageTextFieldEl = document.getElementById("message"); // this is text field

const publishBtnEl = document.getElementById("publish"); // this is button
const messagesContainerEl = document.getElementById("messages");

const messagesArray = [];

publishBtnEl.addEventListener("click", deployNewmessage);

//function for creating new messages
function createNewmessage() {
  let newMessage = ``;
  for (let [i, message] of messagesArray.entries()) {
    newMessage += `
      <div class="message" id=${i}>
        <span>${message} </span>
        <button class="delete-btn" id=${i}>
          <img src='images/Trash.png'/>
        </button>
      </div>`;
  }
  return newMessage;
}

// new message deploy function
function deployNewmessage() {
  let textMessage = messageTextFieldEl.value;
  console.log(typeof messageTextFieldEl.value, messageTextFieldEl.value);
  resetText(messageTextFieldEl); //getting value from textarea
  console.log(textMessage);
  // checking whether textfiled is empty or not
  if (textMessage[0] !== "") {
    messagesArray.push(textMessage);
    render();
    console.log(typeof textMessage);
  } else {
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
  }
}
// enter keydown function
messageTextFieldEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    deployNewmessage();
  }
});
