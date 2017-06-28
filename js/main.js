var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(todoText, position) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    this.todos[position].completed = !this.todos[position].completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var todosCompleted = 0;
    this.todos.forEach(function(todo){
      if (todo.completed === true) {
        todosCompleted++;
      };
    });
    if (totalTodos === todosCompleted) {
      this.todos.forEach(function(todo) {
        todo.completed = false;
      });
    } else {
      this.todos.forEach(function(todo) {
        todo.completed = true;
      });
    };
  }
};

var handlers = {
  addTodo: function() {
    var todoTextInput = document.getElementById("textAddTodoInput");
    todoList.addTodo(todoTextInput.value);
    todoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function(position) {
    var todoTextInput = document.getElementById("textChangeTodoInput");
    todoList.changeTodo(todoTextInput.value, position);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement("li");
      var todoChecked = this.createToggleCompletedCheckbox();
      if (todo.completed === true) {
        todoChecked.checked = true;
      } else {
        todoChecked.checked = false;
      };
      todoLi.id = position;
      todoUl.appendChild(todoLi);
      todoLi.appendChild(todoChecked);

      //Text of todo
      var todoTextSpan = document.createElement("span");
      todoTextSpan.textContent = todo.todoText;
      todoLi.appendChild(todoTextSpan);

      todoLi.appendChild(this.createChangeButton());
      todoLi.appendChild(this.createDeleteButton());
    }, this);

    // Checkbox Toggle All Checked
    var checkedboxToggleAll = document.querySelector("input[type=checkbox]");
    var totalTodosCompleted = 0;
    if (todoList.todos.length === 0) {
      checkedboxToggleAll.disabled = true;
    } else {
      checkedboxToggleAll.disabled = false;
    };
    todoList.todos.forEach(function(todo) {
      if (todo.completed === true) {
        totalTodosCompleted++;
      };
    });
    if (totalTodosCompleted === todoList.todos.length) {
      checkedboxToggleAll.checked = true;
    } else {
      checkedboxToggleAll.checked = false;
    };
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton glyphicon glyphicon-remove";
    return deleteButton;
  },
  createToggleCompletedCheckbox: function() {
    var toggleCompletedCheckbox = document.createElement("input");
    toggleCompletedCheckbox.setAttribute("type", "checkbox");
    return toggleCompletedCheckbox;
  },
  createChangeButton: function() {
    var changeButton = document.createElement("button");
    changeButton.className = "changeButton glyphicon glyphicon-pencil";
    return changeButton;
  },
  createChangeLi: function() {
    var changeInput = document.createElement("input");
    var okButton = document.createElement("button");
    changeInput.setAttribute("type", "text");
    changeInput.id = "textChangeTodoInput";
    okButton.className = "okButton glyphicon glyphicon-ok";
    var span = document.createElement("span");
    span.appendChild(changeInput);
    span.appendChild(okButton);
    return span;
  },
  setUpEventListeners: function() {
    var todoUl = document.querySelector("ul");
    todoUl.addEventListener("click", function(event) {
      var clickedElement = event.target;
      var position = parseInt(clickedElement.parentNode.id);

// delete todo
      if (clickedElement.className === "deleteButton glyphicon glyphicon-remove") {
        handlers.deleteTodo(position);
      };

//toggle completed
      if (clickedElement.type === "checkbox") {
        handlers.toggleCompleted(position);
      };

// change todo
      if (clickedElement.className === "changeButton glyphicon glyphicon-pencil") {
// change li content, fill it with
        var todoLi = clickedElement.parentNode;
        var span = view.createChangeLi();
        todoLi.insertBefore(span, todoLi.childNodes[1]);
        console.log(span);
        span.childNodes[0].value = todoLi.childNodes[2].textContent;
        todoLi.removeChild(todoLi.childNodes[2]);
        todoLi.removeChild(todoLi.childNodes[2]);
      };

//confirm changed todo
      if (clickedElement.className === "okButton glyphicon glyphicon-ok") {
        var position = parseInt(clickedElement.parentNode.parentNode.id);
        handlers.changeTodo(position);
      };
    });

    var checkedboxToggleAll = document.querySelector("input[type=checkbox]");
    checkedboxToggleAll.addEventListener("click", function() {
      handlers.toggleAll();
    });
  }
};

view.setUpEventListeners();