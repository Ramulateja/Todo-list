let tasks = [];
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addButton = document.getElementById("addbtn");
const taskList = document.getElementById("taskList");
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  tasks.forEach(task => {
    createTaskElement(task);
  });
}
addButton.addEventListener("click", () => {
  const titleValue = titleInput.value.trim();
  const descriptionValue = descriptionInput.value.trim();
  if (titleValue === "" || descriptionValue === "") return;
  const task = {
    title: titleValue,
    description: descriptionValue,
    completed: false
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));//"stringify" while storing in the localstorage before that it convert into string 
  createTaskElement(task);
  titleInput.value = "";
  descriptionInput.value = "";
});
function createTaskElement(task) {
  const taskItem = document.createElement("li");
  taskItem.className ="flex items-start justify-between bg-gray-100 p-3 rounded hover:bg-gray-200 focus:outline-2 focus:outline-offset-2 focus:outline-gray-200 active:bg-gray-200";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "mr-2 mt-1";
  checkbox.checked = task.completed;
  const textContainer = document.createElement("div");
  textContainer.className = "flex-1";
  const taskTitle = document.createElement("h3");
  taskTitle.textContent = task.title;
  taskTitle.className = "font-semibold";
  const taskDescription = document.createElement("p");
  taskDescription.textContent = task.description;
  taskDescription.className = "text-sm text-gray-600";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className ="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700";
  if (task.completed) {
    taskTitle.classList.add("line-through", "text-gray-400");
  }
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    if (checkbox.checked) {
      taskTitle.classList.add("line-through", "text-gray-400");
    } else {
      taskTitle.classList.remove("line-through", "text-gray-400");
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  textContainer.appendChild(taskTitle);
  textContainer.appendChild(taskDescription);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(textContainer);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}