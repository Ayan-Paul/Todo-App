(function (global) {
  function showAlert(selector, type, message) {
    var $box = $(selector);
    $box.removeClass("d-none alert-success alert-danger alert-warning alert-info");
    $box.addClass("alert-" + type).text(message);
  }

  function hideAlert(selector) {
    var $box = $(selector);
    $box.addClass("d-none").removeClass("alert-success alert-danger alert-warning alert-info").text("");
  }

  function withButtonLoading($button, loadingText, callback) {
    var originalText = $button.html();
    $button.prop("disabled", true);
    $button.html(
      '<span class="spinner-border spinner-border-sm spinner-btn me-2" aria-hidden="true"></span>' + loadingText
    );
    return Promise.resolve()
      .then(callback)
      .finally(function () {
        $button.prop("disabled", false);
        $button.html(originalText);
      });
  }

  global.AppUtils = {
    showAlert: showAlert,
    hideAlert: hideAlert,
    withButtonLoading: withButtonLoading
  };
})(window);
