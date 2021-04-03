let taskInput = document.getElementById("todo__new-task-input");
let addButton = document.getElementById("todo__add-btn");
let incompleteTaskHolder = document.getElementById("task-list-incompleted");
let completedTasksHolder = document.getElementById("task-list-completed");


let createNewTaskElement = function(taskString) {
  let task = document.getElementById("task-template").content.cloneNode(true);

  task.querySelector(".task__text").innerText = taskString;

  return task;
}


let addTask = function() {
  if (!taskInput.value) return;
  let task = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.append(task);

  let taskList = incompleteTaskHolder.querySelectorAll(".task");
  task = taskList[taskList.length - 1];
  
  bindTaskEvents(task, taskCompleted);
  taskInput.value = "";
}


let editTask = function() {
  let task = this.parentNode;

  let taskInput = task.querySelector(".task__input");
  let taskText = task.querySelector(".task__text");
  let taskEditButton = task.querySelector(".task__edit-btn");
  let editing = task.classList.contains("task--edit");

  if (editing) {
    taskText.innerText = taskInput.value;
    taskEditButton.innerText = "Edit";
  } else {
    taskInput.value = taskText.innerText;
    taskEditButton.innerText = "Save";
  }

  task.classList.toggle("task--edit");
  taskText.classList.toggle("task__text--edit");
  taskInput.classList.toggle("task__input--edit");
};


let deleteTask = function() {
  let task = this.parentNode;
  let taskList = task.parentNode;
  taskList.removeChild(task);
}


let taskCompleted = function() {
  let task = this.parentNode;
  completedTasksHolder.append(task);
  bindTaskEvents(task, taskIncomplete);
}


var taskIncomplete = function() {
  let task = this.parentNode;
  incompleteTaskHolder.append(task);
  bindTaskEvents(task, taskCompleted);
}


addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

let bindTaskEvents = function(task, checkBoxEventHandler) {
  let checkBox = task.querySelector(".task__checkbox");
  var editButton = task.querySelector(".task__edit-btn");
  var deleteButton = task.querySelector(".task__delete-btn");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}