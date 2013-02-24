var application = {
    init: function () {
        $('#status').text('Device Ready! Go for it.');
        $('#btnScan').on('click', scan());
    },
    scan: function() {
        console.log('scanning');
        try {
            window.plugins.barcodeScanner.scan(function(args) {
                console.log("Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n");

                //                if (args.format == "QR_CODE") {
                //                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                //                }

                $('#scanResults').html(args.toJSON());
            }, function(error) {
                alert("Scanning failed: " + error);
            });
        } catch (ex) {
            alert(ex.message);
        }
    }
};