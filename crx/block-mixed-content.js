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
        // Block the mixed content (optional).
        event.preventDefault();

        // Prepare a report about the vulnerability.
        var vulnerability_report = {
            'insecure_url': event.url,
            'document_url': document.location.href,
            'target_node_name': event.target.nodeName,
            'target_id': event.target.getAttribute('id')
        };

        // Send the report to the extension's background page.
        chrome.extension.sendRequest(vulnerability_report);

        // If you'd like to report the vulnerability to your own server, you
        // can use XMLHttpRequest:
        //
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', '/report-mixed-content.php');
        // xhr.send(JSON.stringify(vulnerability_report));
    }, true);
})();
