(function () {

    var userAgent = navigator.userAgent + '';
    var mobileSystem;
    if (userAgent.indexOf('iPhone') > -1) {
        mobileSystem = 'iphone';
    } else if (userAgent.indexOf('Android') > -1) {
        mobileSystem = 'android';
    } else {
        mobileSystem = '';
    }
    console.log(mobileSystem);
    var deviceReady = false;
    var jqmMobileInit = false;

    var initApp = function () {
        if ((deviceReady && jqmMobileInit) || (jqmMobileInit && !mobileSystem)) {
            application.init();
        }
    };

    var onDeviceReady = function () {
        deviceReady = true;
        console.log('dev ready');
        initApp();
    };

    var onMobileInit = function () {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        jqmMobileInit = true;
        console.log('jqm ready');
        initApp();
    };

    $(document).bind('mobileinit', onMobileInit);
    document.addEventListener("deviceready", onDeviceReady, false);
})();