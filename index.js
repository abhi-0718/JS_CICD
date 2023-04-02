window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  //   var todos = [];
  //   var todos = JSON.parse(localStorage.getItem("todos"));
  const nameInput = document.querySelector("#name");
  const newTask = document.querySelector("#create-task");

  const userName = localStorage.getItem("username") || "";

  nameInput.value = userName;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      //   createdAt: new Date().getItem(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

    displayTodo();
  });

  displayTodo();
});
function displayTodo() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const deleteButton = document.createElement("button");

    todoItem.classList.add("todo-item");

    input.type = "checkbox";

    input.checked = todo.done;

    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("work");
    }

    content.classList.add("todo-content");

    actions.classList.add("actions");

    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;

    deleteButton.innerHTML = "Delete";

    label.appendChild(span);
    label.appendChild(input);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify("todos"));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      displayTodo();
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodo();
    });
  });
}
