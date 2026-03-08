$(function () {
  if (!window.Auth.requireAuth("./login.html")) {
    return;
  }

  var $todoList = $("#todoList");
  var $emptyState = $("#emptyState");
  var $createBtn = $("#createBtn");
  var $todoForm = $("#todoForm");

  function handleAuthError(error) {
    if (error.message.toLowerCase().indexOf("could not validate credentials") !== -1) {
      Auth.clearToken();
      window.location.href = "./login.html";
      return true;
    }
    return false;
  }

  function renderTodos(todos) {
    $todoList.empty();
    if (!todos.length) {
      $emptyState.removeClass("d-none");
      return;
    }
    $emptyState.addClass("d-none");

    todos.forEach(function (todo) {
      var itemClass = todo.is_done ? "todo-item-done" : "";
      var statusLabel = todo.is_done ? "Mark as pending" : "Mark as done";
      var statusClass = todo.is_done ? "btn-warning" : "btn-success";

      var $item = $(
        '<li class="list-group-item py-3 ' + itemClass + '">' +
          '<div class="d-flex justify-content-between align-items-start gap-2">' +
            '<div>' +
              '<div class="todo-item-title">' + escapeHtml(todo.title) + "</div>" +
              '<div class="text-secondary small">' + escapeHtml(todo.description || "") + "</div>" +
            "</div>" +
            '<div class="d-flex gap-2">' +
              '<button class="btn btn-sm ' + statusClass + ' btn-toggle"> ' + statusLabel + " </button>" +
              '<button class="btn btn-sm btn-outline-danger btn-delete">Delete</button>' +
            "</div>" +
          "</div>" +
        "</li>"
      );

      $item.find(".btn-toggle").on("click", function () {
        ApiClient.updateTodo(todo.id, { is_done: !todo.is_done })
          .then(loadTodos)
          .catch(function (error) {
            if (!handleAuthError(error)) {
              AppUtils.showAlert("#alertBox", "danger", error.message);
            }
          });
      });

      $item.find(".btn-delete").on("click", function () {
        ApiClient.deleteTodo(todo.id)
          .then(loadTodos)
          .catch(function (error) {
            if (!handleAuthError(error)) {
              AppUtils.showAlert("#alertBox", "danger", error.message);
            }
          });
      });

      $todoList.append($item);
    });
  }

  function loadTodos() {
    AppUtils.hideAlert("#alertBox");
    ApiClient.listTodos()
      .then(renderTodos)
      .catch(function (error) {
        if (!handleAuthError(error)) {
          AppUtils.showAlert("#alertBox", "danger", error.message);
        }
      });
  }

  $("#logoutBtn").on("click", function () {
    Auth.clearToken();
    window.location.href = "./login.html";
  });

  $("#refreshBtn").on("click", function () {
    loadTodos();
  });

  $todoForm.on("submit", function (event) {
    event.preventDefault();
    AppUtils.hideAlert("#alertBox");

    if (!$todoForm[0].checkValidity()) {
      $todoForm[0].reportValidity();
      return;
    }

    var payload = {
      title: $("#title").val().trim(),
      description: $("#description").val().trim()
    };

    AppUtils.withButtonLoading($createBtn, "Creating...", function () {
      return ApiClient.createTodo(payload)
        .then(function () {
          $todoForm[0].reset();
          loadTodos();
        })
        .catch(function (error) {
          if (!handleAuthError(error)) {
            AppUtils.showAlert("#alertBox", "danger", error.message);
          }
        });
    });
  });

  function escapeHtml(input) {
    return String(input)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  loadTodos();
});
