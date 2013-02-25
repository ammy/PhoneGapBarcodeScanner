var application = {
    urlRegex: '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
    init: function () {
        console.log("init");
        $('#status').text('Device Ready! Go for it.');
        $('#btnScan').on('tap', this.scan);
        $('#goToUrl').on('tap', this.goToUrl);
    },
    scan: function() {
        console.log('scanning');
        $('#goToUrl').buttonMarkup('disable');
        try {
            if (window.plugins && window.plugins.barcodeScanner) {
                window.plugins.barcodeScanner.scan(function(result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                    $('#scanResults').text(result.text);
                }, function(error) {
                    alert("Scanning failed: " + error);
                });
            } else {
                $('#goToUrl').buttonMarkup('enable');

                $('#scanResults').text("No scanner plugin available");
                //$('#home').trigger('refresh');
            }
//            window.plugins.barcodeScanner.scan(function(args) {
//                console.log("Scanner result: \n" +
//                    "text: " + args.text + "\n" +
//                    "format: " + args.format + "\n" +
//                    "cancelled: " + args.cancelled + "\n");
//                
//                //match a url
//                if (args.format == "QR_CODE" && args.text.match(urlRegex)) {
//                }
//                alert(args.text);
//                $('#scanResults').text(args.text);
//            });
        } catch (ex) {
            alert(ex.message);
        }
    },
    goToUrl:function(){
        window.plugins.childBrowser.showWebPage($('#scanResults').html(), { showLocationBar: false });
    }
};