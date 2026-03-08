(function (global) {
  var API_BASE_URL = global.APP_CONFIG.API_BASE_URL;

  function ajax(options) {
    return $.ajax(options).catch(function (xhr) {
      var detail = "Request failed";
      if (xhr.responseJSON && xhr.responseJSON.detail) {
        if (Array.isArray(xhr.responseJSON.detail)) {
          detail = xhr.responseJSON.detail.map(function (item) {
            return item.msg || JSON.stringify(item);
          }).join(", ");
        } else {
          detail = xhr.responseJSON.detail;
        }
      }
      throw new Error(detail);
    });
  }

  function authHeaders() {
    var token = global.Auth.getToken();
    return token ? { Authorization: "Bearer " + token } : {};
  }

  function register(payload) {
    return ajax({
      url: API_BASE_URL + "/auth/register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload)
    });
  }

  function login(credentials) {
    return ajax({
      url: API_BASE_URL + "/auth/login",
      method: "POST",
      data: credentials
    });
  }

  function listTodos() {
    return ajax({
      url: API_BASE_URL + "/todos/",
      method: "GET",
      headers: authHeaders()
    });
  }

  function createTodo(payload) {
    return ajax({
      url: API_BASE_URL + "/todos/",
      method: "POST",
      headers: authHeaders(),
      contentType: "application/json",
      data: JSON.stringify(payload)
    });
  }

  function updateTodo(todoId, payload) {
    return ajax({
      url: API_BASE_URL + "/todos/" + todoId,
      method: "PATCH",
      headers: authHeaders(),
      contentType: "application/json",
      data: JSON.stringify(payload)
    });
  }

  function deleteTodo(todoId) {
    return ajax({
      url: API_BASE_URL + "/todos/" + todoId,
      method: "DELETE",
      headers: authHeaders()
    });
  }

  global.ApiClient = {
    register: register,
    login: login,
    listTodos: listTodos,
    createTodo: createTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
  };
})(window);
