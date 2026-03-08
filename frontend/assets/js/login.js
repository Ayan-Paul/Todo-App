$(function () {
  if (!window.Auth.requireGuest("./dashboard.html")) {
    return;
  }

  var $form = $("#loginForm");
  var $submitBtn = $("#submitBtn");

  $form.on("submit", function (event) {
    event.preventDefault();
    AppUtils.hideAlert("#alertBox");

    if (!$form[0].checkValidity()) {
      $form[0].reportValidity();
      return;
    }

    var payload = {
      username: $("#username").val().trim(),
      password: $("#password").val()
    };

    AppUtils.withButtonLoading($submitBtn, "Signing in...", function () {
      return ApiClient.login(payload)
        .then(function (response) {
          Auth.setToken(response.access_token);
          window.location.href = "./dashboard.html";
        })
        .catch(function (error) {
          AppUtils.showAlert("#alertBox", "danger", error.message);
        });
    });
  });
});
