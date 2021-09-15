const taskContainer = document.querySelector(".task__container");

const globalStorage = [];

const initialLoadCards = () => {
  const getCardData = localStorage.getItem("tasky");

  const { cards } = JSON.parse(getCardData);

  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

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
      <button type="button" class="btn btn-outline-danger">
        <i class="fas fa-trash"></i>
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
