var application = {
    urlRegex: '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
    init: function () {
        $('#status').text('Device Ready! Go for it.');
        $('#btnScan').bind('click', this.scan);
    },
    scan: function() {
        console.log('scanning');
        try {
            window.plugins.barcodeScanner.scan(function(args) {
                console.log("Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n");
                
                //match a url
                if (args.format == "QR_CODE" && args.text.match(urlRegex)) {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }

                $('#scanResults').html(args.text);
            }, function(error) {
                alert("Scanning failed: " + error);
            });
        } catch (ex) {
            alert(ex.message);
        }
    }
};