define(["views/list-view", "services/list-service"], function (
  listView,
  listService
) {
  var externals = {};
  var internals = {};

  externals.start = function () {
    if (listView.getUserNameOrID() == null) {
      window.location.hash = "main";
    } else {
      listView.doTablePageRender();
    }
  };

  return externals;
});
