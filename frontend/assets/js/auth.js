(function (global) {
  var TOKEN_KEY = global.APP_CONFIG.TOKEN_KEY;

  function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function isAuthenticated() {
    return Boolean(getToken());
  }

  function requireAuth(redirectPath) {
    if (!isAuthenticated()) {
      window.location.href = redirectPath;
      return false;
    }
    return true;
  }

  function requireGuest(redirectPath) {
    if (isAuthenticated()) {
      window.location.href = redirectPath;
      return false;
    }
    return true;
  }

  global.Auth = {
    setToken: setToken,
    getToken: getToken,
    clearToken: clearToken,
    isAuthenticated: isAuthenticated,
    requireAuth: requireAuth,
    requireGuest: requireGuest
  };
})(window);
