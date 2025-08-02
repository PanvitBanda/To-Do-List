const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-all");
const loadBtn = document.getElementById("load-tasks");
const themeBtn = document.getElementById("theme-toggle");

const STORAGE_KEY = "todo_tasks";

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function addTask(text, id = generateID()) {
  const li = document.createElement("li");
  li.setAttribute("data-id", id);

  const span = document.createElement("span");
  span.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    taskInput.value = "";
    saveTasks();
  }
});

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      id: li.getAttribute("data-id"),
    });
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  taskList.innerHTML = "";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const tasks = JSON.parse(stored);
    tasks.forEach((task) => addTask(task.text, task.id));
  }
}

clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem(STORAGE_KEY);
});

loadBtn.addEventListener("click", () => {
  loadTasks();
});

function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

themeBtn.addEventListener("click", () => {
  const current = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(current);
});

window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});
