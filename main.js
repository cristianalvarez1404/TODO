const listTask = document.getElementById("tasks");
const inputFormTask = document.querySelector("#task");
const formTask = document.getElementById("formTask");

let tasks = [
  // {
  //   id: 1,
  //   name: "Go to gym",
  //   completed: true,
  // },
  // {
  //   id: 2,
  //   name: "Go to shop",
  //   completed: false,
  // },
  // {
  //   id: 3,
  //   name: "Go to university",
  //   completed: false,
  // },
  // {
  //   id: 4,
  //   name: "Go to walk",
  //   completed: true,
  // },
];

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();
});

const loadTasks = () => {
  const getTasks = localStorage.getItem("tasks");
  !getTasks ? (tasks = []) : (tasks = JSON.parse(getTasks));
};

const updateStorageTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completedTask = (id) => {
  tasks = tasks.map((task, index) => {
    if (task.id == id) {
      task = { ...task, completed: !task.completed };
    }
    return task;
  });

  updateStorageTasks();
  renderTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  updateStorageTasks();
  renderTasks();
};

const renderTasks = () => {
  while (listTask.lastElementChild) {
    listTask.lastElementChild.remove();
  }

  tasks.map((task) => {
    const taskEl = document.createElement("li");

    taskEl.textContent = task.completed ? ` ${task.name}` : ` ${task.name}`;
    if (task.completed) taskEl.className = "taskCompleted";

    taskEl.addEventListener("click", () => completedTask(task.id));
    taskEl.addEventListener("dblclick", () => deleteTask(task.id));

    listTask.appendChild(taskEl);
  });
};

const createTask = (task) => {
  const newTask = {
    id: tasks.length + 1,
    name: task,
    completed: false,
  };

  tasks.push(newTask);
  inputFormTask.value = "";
  inputFormTask.focus();
  updateStorageTasks();
  renderTasks();
};

formTask.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputFormTask.value !== "") {
    createTask(inputFormTask.value);
  }
});
