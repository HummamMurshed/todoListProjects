let tasks = [
  { title: "إنهاء كورس  جافا سكربت", date: "12/1/2024" },
  { title: "إنهاء كورس  جافا سكربت", date: "12/1/2024" },
];
let countTask = document.getElementById("countspan");

let taskBox = document.getElementById("task-board");
let btnAdd = document.getElementById("btnadd");

console.log(btnAdd.id);

function setTotalTask() {
  countTask.innerHTML = `(${tasks.length})`;
}

function getContent(text, date, index) {
  let content = `
<div class="content" >
<div class="task" id="s${index}">
  <div class="task-info">
    <h2>${text}</h2>

    <div class="date">
      <img
        class="cla"
        src="images/icons8_calendar_30px.png"
        alt=""
      />
      
      <span>${date}</span>
    </div>
  </div>

  <div class="function">
    <button onclick='deleteTask(${index})' class="delete circular-buttons"><i class="fas fa-remove"></i></button>
    <button onclick="editTask(${index})" class="edit circular-buttons">
    <i class="fas fa-pen"></i>
    </button>
    <button onclick="doneTask(${index})" id="${index}" class="save circular-buttons">
    <i class="fas fa-check"></i>
</button>
  </div>
</div>
</div>
`;
  return content;
}

function loadTaskFromLocalStorage() {
  content = JSON.parse(localStorage.getItem("tasks"));
  if (content) {
    tasks = content;
  } else {
  }
}

function saveTaskToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTask() {
  taskBox.innerHTML = "";
}
function checkDoneTask(task, index) {
  let btnSave = document.getElementById(index);
  if (task.isDone) {
    setTaskColor(task, index);
    tasks[index].isDone = false;
  } else {
    setTaskColor(task, index);
    tasks[index].isDone = true;
  }
}

function setTaskColor(task, index) {
  let btnSave = document.getElementById(index);
  if (task.isDone) {
    document.getElementById("s" + index).style.backgroundColor =
      "rgb(158, 253, 160)";
    setBtnSave(btnSave, "green", `<i class="fas fa-cancel"></i>`);
  } else {
    document.getElementById("s" + index).style.backgroundColor = "white";
    setBtnSave(btnSave, "green", `<i class="fas fa-check"></i>`);
  }
}

function refresh() {
  clearTask();
  let index = 0;

  for (task of tasks) {
    taskBox.innerHTML += getContent(task.title, task.date, index);
    setTaskColor(task, index);
    index++;
  }
  setTotalTask();
}

function getFullDate() {
  let date =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    +1 +
    "/" +
    new Date().getFullYear();
  return date;
}

console.log(getFullDate());

function readTasinfo(message = "قم بإدخال عنوان المهمة :") {
  let task = {};

  task.title = window.prompt(message);
  task.date = getFullDate();
  task.isDone = false;
  return task;
}

btnAdd.onclick = function () {
  tasks.push(readTasinfo());
  refresh();
  console.log(Date());
};

function deleteTask(index) {
  if (confirm("هل أنت متأكد من حذف المهام المحدد : " + tasks[index].title)) {
    tasks.splice(index, 1);
    refresh();
    saveTaskToLocalStorage();
  }
}

function editTask(index) {
  tasks[index] = readTasinfo("قم بإدخال عنوان المهمة الجديد:");
  refresh();
  saveTaskToLocalStorage();
}

function setBtnSave(btnSave, color, icon) {
  btnSave.style.backgroundColor = color;
  btnSave.innerHTML = icon;
}

function doneTask(index) {
  checkDoneTask(tasks[index], index);
  refresh();
  saveTaskToLocalStorage();
}
loadTaskFromLocalStorage();
refresh();
