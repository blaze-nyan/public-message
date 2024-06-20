import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    //yourURL
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const messagesInDB = ref(database, "messages");
let newMessage = ``;
let messagevalArray;
onValue(messagesInDB, function (snapshot) {
  newMessage = ``;
  if (snapshot.val()) {
    messagevalArray = Object.entries(snapshot.val());
    messagesArray = messagevalArray;
    messagevalArray.forEach(function (childSnapshot) {
      const messageValues = childSnapshot;
      let newMessage = messageValues[1];
      let currentId = messageValues[0];
      render(currentId, newMessage);
    });
  } else {
    messagesContainerEl.innerHTML = "";
  }
});

const messageTextFieldEl = document.getElementById("message-text"); // this is text field
const publishBtnEl = document.getElementById("publish"); // this is button
const messagesContainerEl = document.getElementById("messages");
const deleteAllBtnEl = document.getElementById("delete-all");
let key = 0;
let isFav = false;
let messagesArray;

publishBtnEl.addEventListener("click", deployNewmessage);

//function for creating new messages

function createNewmessage(currentId, message) {
  let favIconClass = "";
  if (message.isFav) {
    favIconClass = "fav-ed";
  } else {
    favIconClass = "";
  }
  newMessage += `
      <div class="message-content">
        <button class="fav-button ${favIconClass}" id="fav-button" data-fav=${currentId}><i class="fa-solid fa-star" data-fav=${currentId}></i></button>
        <div class="message" id=${currentId}>
          <span>${message.textMessage} </span>
          <button class="delete-btn" data-message=${currentId}>
            <i class="fa-solid fa-trash-can" data-message=${currentId}></i>
          </button>
        </div>
      </div>`;
  return newMessage;
}

// new message deploy function
function deployNewmessage() {
  let userMessage = messageTextFieldEl.value;
  let textMessage = userMessage.trim();

  if (textMessage !== "") {
    resetText(messageTextFieldEl); //getting value from textarea
    let currentMessage = { key, textMessage, isFav };
    push(messagesInDB, currentMessage);
    key++;
  } else {
    resetText(messageTextFieldEl);
    alert("no message yet");
  }
}
// function for reset
function resetText(element) {
  element.value = "";
}

function render(currentId, message) {
  // messagesContainerEl.innerHTML = "";
  messagesContainerEl.innerHTML = createNewmessage(currentId, message);
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
  const targetMessage = messagevalArray.filter(function (message) {
    return message[0] == targetKey;
  })[0];
  if (targetMessage[1].isFav == false) {
    let deleteMessage = ref(database, `messages/${targetKey}`);
    remove(deleteMessage);
  }
}
// fav button
function handleFavButton(targetKey) {
  const targetMessage = messagevalArray.filter(function (message) {
    return message[0] == targetKey;
  })[0];

  const messageRef = ref(database, "messages/" + targetKey);
  update(messageRef, {
    isFav: !targetMessage[1].isFav,
  });
}

//delete all button

deleteAllBtnEl.addEventListener("click", function () {
  const targetMessagesArray = messagevalArray.filter(function (message) {
    return message[1].isFav == false;
  });
  targetMessagesArray.forEach(function (message) {
    let deleteMessage = ref(database, `messages/${message[0]}`);
    remove(deleteMessage);
  });
});
