$(function () {
  if (!window.Auth.requireGuest("./dashboard.html")) {
    return;
  }

  var $form = $("#registerForm");
  var $submitBtn = $("#submitBtn");

  $form.on("submit", function (event) {
    event.preventDefault();
    AppUtils.hideAlert("#alertBox");

    if (!$form[0].checkValidity()) {
      $form[0].reportValidity();
      return;
    }

    var payload = {
      email: $("#email").val().trim(),
      username: $("#username").val().trim(),
      password: $("#password").val()
    };

    AppUtils.withButtonLoading($submitBtn, "Creating account...", function () {
      return ApiClient.register(payload)
        .then(function () {
          return ApiClient.login({
            username: payload.username,
            password: payload.password
          });
        })
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
