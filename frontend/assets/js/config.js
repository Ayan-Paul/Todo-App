(function (global) {
  var isLocalHost = ["127.0.0.1", "localhost"].indexOf(window.location.hostname) !== -1;
  var defaultApiBase = isLocalHost
    ? "http://127.0.0.1:8000/api/v1"
    : "https://todo-api.onrender.com/api/v1";

  global.APP_CONFIG = {
    API_BASE_URL: defaultApiBase,
    TOKEN_KEY: "todo_app_access_token"
  };
})(window);
