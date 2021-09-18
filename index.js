const taskContainer = document.querySelector(".task__container");

let globalStorage = [];

const initialLoadCards = () => {
  //accessing data from localstorage
  const getCardData = localStorage.getItem("tasky");

  //parsing the data from localstorage
  const { cards } = JSON.parse(getCardData);

  //loop to create html cards
  cards.map((cardObject) => {
    //injecting the cards to dom
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    //updating the globalstorage
    globalStorage.push(cardObject);
  });
};

//to create new cards with the data
const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-1">
      <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this, arguments)">
        <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)"></i>
      </button>
      <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
        <i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
      </button>
    </div>
    <div class="card-body">
      <img
        src="${taskData.imageUrl}"
        class="card-img-top"
        alt="Card Image"
      />
      <h5 class="card-title">${taskData.taskTitle}</h5>
      <p class="card-text">${taskData.taskDescription}</p>
      <a class="bg-primary text-light"> ${taskData.taskType} </a>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <button type="button" class="btn btn-outline-primary" id=${taskData.id}"> 
        Open Task
      </button>
    </div>
  </div>
</div>
`;

//to save the data using save changes button
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStorage.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStorage }));
};

const deleteCard = (event) => {
  event = window.event;
  const targetId = event.target.id;
  const tagname = event.target.tagName;

  globalStorage = globalStorage.filter(
    (cardObject) => cardObject.id !== targetId
  );

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStorage }));

  if (tagname === "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

const editCard = (event) => {
  event = window.event;
  const targetId = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[3].childNodes[3];
  let taskDescription = parentElement.childNodes[3].childNodes[5];
  let taskType = parentElement.childNodes[3].childNodes[7];
  let submitButton = parentElement.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.innerHTML = "Save changes";
  submitButton.setAttribute(
    "onclick",
    "saveEditedChanges.apply(this, arguments)"
  );
};

const saveEditedChanges = (event) => {
  event = window.event;
  const targetId = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[3].childNodes[3];
  let taskDescription = parentElement.childNodes[3].childNodes[5];
  let taskType = parentElement.childNodes[3].childNodes[7];
  let submitButton = parentElement.childNodes[5].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  globalStorage = globalStorage.map((task) => {
    if (task.id === targetId) {
      return {
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task;
  });

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStorage }));

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = "Open task";
};
