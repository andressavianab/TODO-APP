let form = document.querySelector("#form");
let input = document.querySelector("#input");
let ul = document.querySelector("#todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => {
  createLi(task);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    e.preventDefault();
  } else {
    let task = {
      name: input.value,
      id: tasks.length,
    };

    createLi(task);

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  input.value = "";
});

function createLi(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.classList.add("todo-text");
  span.innerHTML = task.name;

  const div = document.createElement("div");

  const trashBtn = document.createElement("button");
  trashBtn.classList.add("action-btn");
  trashBtn.innerHTML = '<i class="fa fa-trash">';

  div.appendChild(trashBtn);

  li.appendChild(span);
  li.appendChild(div);
  ul.appendChild(li);

  trashBtn.addEventListener("click", function () {
    deletLi(li, task.id);
  });
}

function deletLi(tag, id) {
  tag.remove();
  tasks.splice(
    tasks.findIndex((element) => element.id == id),
    1
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
