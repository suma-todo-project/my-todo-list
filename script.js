
const input = document.querySelector("input");
const button = document.querySelector("button");
const taskList = document.createElement("ul");

document.querySelector(".container").appendChild(taskList);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}function updateTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter(function (task) {
    return task.done;
  }).length;

  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;

  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  document.getElementById("progressText").textContent = percentage + "%";
  document.getElementById("progressFill").style.width = percentage + "%";
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "pending") {
      return !task.done;
    }

    if (currentFilter === "completed") {
      return task.done;
    }

    return true;
  });

 filteredTasks.forEach(function (task)  {
    const index = tasks.indexOf(task);
    const item = document.createElement("li");
    const taskText = document.createElement("span");
    const doneButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
const editButton = document.createElement("button");

editButton.textContent = "Edit";


    taskText.textContent = task.text;

    if (task.done) {
      taskText.style.textDecoration = "line-through";
    }

    doneButton.textContent = "Done";
    deleteButton.textContent = "Delete";

    
editButton.addEventListener("click", function () {
  const newText = prompt("Edit your task:", task.text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
});
doneButton.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    item.appendChild(taskText);
    item.appendChild(document.createTextNode(" "));
    item.appendChild(editButton);
    item.appendChild(doneButton);
    item.appendChild(deleteButton);

    taskList.appendChild(item);
  });
}


input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", function () {
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
});

renderTasks();
document.querySelectorAll(".filters button").forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    const filters = ["all", "pending", "completed"];
    currentFilter = filters[index];
    renderTasks();
  });
});
