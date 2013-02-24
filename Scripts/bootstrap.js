(function () {
    var deviceReady = false;
    var jqmMobileInit = false;

    var initApp = function () {
        if ((deviceReady && jqmMobileInit) || (jqmMobileInit && !mobile_system)) {
            startApp();
        }
    };

    var onDeviceReady = function () {
        deviceReady = true;
        //alert('dev ready');
        initApp();
    };

    var onMobileInit = function () {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        jqmMobileInit = true;
        //alert('jqm ready');
        initApp();
    };

    $(document).bind('mobileinit', onMobileInit);
    document.addEventListener("deviceready", onDeviceReady, false);
})();