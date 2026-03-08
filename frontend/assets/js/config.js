(function (global) {
  var runtimeConfig = global.__APP_CONFIG__ || {};
  var isLocalHost = ["127.0.0.1", "localhost"].indexOf(window.location.hostname) !== -1;
  var defaultApiBase = isLocalHost
    ? "http://127.0.0.1:8000/api/v1"
    : "";
  var apiBaseUrl = runtimeConfig.API_BASE_URL || defaultApiBase;
  var tokenKey = runtimeConfig.TOKEN_KEY || "todo_app_access_token";

  global.APP_CONFIG = {
    API_BASE_URL: apiBaseUrl,
    TOKEN_KEY: tokenKey
  };
})(window);
