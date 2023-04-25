define(['views/list-view', 'services/list-service'], function(
    listView,
    listService
) {
    var externals = {};
    var internals = {};

    externals.start = function() {
        // internals.bindEventHandlers();
        listView.render();
    };



    return externals;
});
