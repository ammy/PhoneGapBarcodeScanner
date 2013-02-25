var application = {
    urlRegex: '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
    init: function () {
        $('#goToUrl').hide();
        $('#status').text('Device Ready! Go for it.');
        $('#btnScan').bind('tap', this.scan);
        $('#goToUrl').bind('tap', this.goToUrl);
    },
    scan: function() {
        console.log('scanning');
        $('#goToUrl').hide();
        try {
            window.plugins.barcodeScanner.scan(function(args) {
                console.log("Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n");
                
                //match a url
                if (args.format == "QR_CODE" && args.text.match(urlRegex)) {
                    $('#goToUrl').show();
                }
                alert(args.text);
                $('#scanResults').text(args.text);
            });
        } catch (ex) {
            alert(ex.message);
        }
    },
    goToUrl:function(){
        window.plugins.childBrowser.showWebPage($('#scanResults').html(), { showLocationBar: false });
    }
};