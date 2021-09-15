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
      <button type="button" class="btn btn-outline-success">
        <i class="fas fa-pencil-alt"></i>
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
      <a href="#" class="bg-primary text-light"></a>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-outline-primary">
        ${taskData.taskType}
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
