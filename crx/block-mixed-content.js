(function() {
    // Strictly speaking, this check is redundant because our content script
    // runs only on https pages.  However, we're keeping this branch here
    // in case folks want to copy and paste this code into their web site
    // directly.
    if (document.location.protocol.match(/^http:$/i))
        return;
    document.addEventListener('beforeload', function() {
        if (!event.url.match(/^http:/i))
            return;

        // We allow insecure images, audio, and video because those resource
        // are not as dangerous as scripts.  A compromised script can make
        // arbitray modifications to the page whereas an insecure image can
        // only affect the contents of the image.
        var node_name = event.target.nodeName;
        if (node_name != 'IMG' && node_name != 'AUDIO' && node_name != 'VIDEO') {
            // Block the mixed content.
            event.preventDefault();
        }

        // If you'd like to report the vulnerability to your own server, you
        // can use XMLHttpRequest:
        //
        // var vulnerability_report = {
        //     'insecure_url': event.url,
        //     'document_url': document.location.href,
        //     'target_node_name': event.target.nodeName,
        //     'target_id': event.target.getAttribute('id')
        // };
        //
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', '/report-mixed-content.php');
        // xhr.send(JSON.stringify(vulnerability_report));
    }, true);
})();
