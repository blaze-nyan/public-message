const messageTextFieldEl = document.getElementById("message-text"); // this is text field
const publishBtnEl = document.getElementById("publish"); // this is button
const messagesContainerEl = document.getElementById("messages");
const deleteAllBtnEl = document.getElementById("delete-all");
let key = 0;
let isFav = false;
let messagesArray = [];
// { key: -1, textMessage: "yoo", isFav: true }

publishBtnEl.addEventListener("click", deployNewmessage);
render();
//function for creating new messages
function createNewmessage() {
  let newMessage = ``;
  let favIconClass = "";
  for (let message of messagesArray) {
    if (message.isFav) {
      favIconClass = "fav-ed";
    } else {
      favIconClass = "";
    }
    newMessage += `
      <div class="message-content">
        <button class="fav-button ${favIconClass}" id="fav-button" data-fav=${message.key}><i class="fa-solid fa-star" data-fav=${message.key}></i></button>
        <div class="message" id=${message.key}>
          <span>${message.textMessage} </span>
          <button class="delete-btn" data-message=${message.key}>
            <i class="fa-solid fa-trash-can" data-message=${message.key}></i>
          </button>
        </div>
      </div>`;
  }
  return newMessage;
}

// new message deploy function
function deployNewmessage() {
  let userMessage = messageTextFieldEl.value;
  textMessage = userMessage.trim();
  if (textMessage !== "") {
    resetText(messageTextFieldEl); //getting value from textarea
    messagesArray.push({ key, textMessage, isFav });
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

//adding event listener

document.addEventListener("click", function (e) {
  let targetId;
  if (e.target.dataset.message) {
    targetId = e.target.dataset.message;
    handleDeleteButton(targetId);
  } else if (e.target.dataset.fav) {
    targetId = e.target.dataset.fav;
    handleFavButton(targetId);
  }
});

// delete button
function handleDeleteButton(targetKey) {
  const targetMessage = messagesArray.filter(function (message) {
    return targetKey == message.key;
  })[0];
  if (!targetMessage.isFav) {
    let exactMessageIndex = messagesArray.indexOf(targetMessage);
    messagesArray.splice(exactMessageIndex, 1);
    render();
  }
}
// fav button
function handleFavButton(targetKey) {
  const targetMessage = messagesArray.filter(function (message) {
    return message.key == targetKey;
  })[0];
  targetMessage.isFav = !targetMessage.isFav;
  render();
}

//delete all button

deleteAllBtnEl.addEventListener("click", function () {
  let targetMessages = messagesArray.filter(function (message) {
    return message.isFav === false;
  });
  targetMessages.forEach(function (message) {
    let targetIndex = messagesArray.indexOf(message);
    messagesArray.splice(targetIndex, 1);
  });
  // console.log(targetMessages);
  render();
});
