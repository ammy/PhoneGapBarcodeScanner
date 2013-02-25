var application = {
    urlRegex: '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
    isScanning: false,
    init: function () {
        console.log("init");
        $('#status').text('Device Ready! Go for it.');
        $('#btnScan').on('tap', this.scan);
        $('#goToUrl').on('tap', this.goToUrl);
    },
    scan: function () {
        var that = this;
        console.log('scanning');
        $('#goToUrl').buttonMarkup('disable');
        try {
            if (window.plugins && window.plugins.barcodeScanner && !this.isScanning) {
                that.isScanning = true;
                window.plugins.barcodeScanner.scan(function(result) {
                    $('#scanResults').text(result.text);
                    //match a url
                    if (result.format == "QR_CODE" && result.text.match(that.urlRegex)) {
                        $('#goToUrl').buttonMarkup('enable');
                    }
                    that.isScanning = false;
                }, function(error) {
                    $('#scanResults').text("Scanning failed: " + error);
                    that.isScanning = false;
                });
            } else {
                $('#scanResults').text("No scanner plugin available");
            }
        } catch(ex) {
            alert(ex.message);
        }
    },
    goToUrl:function(){
        window.plugins.childBrowser.showWebPage($('#scanResults').html(), { showLocationBar: false });
    }
};