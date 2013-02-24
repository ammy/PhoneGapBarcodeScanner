(function () {
    var onMobileInit = function () {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
    };

    $(document).on('mobileinit', onMobileInit);
    $(document).on("pageinit", function (event) {
        application.init();
    });
})();