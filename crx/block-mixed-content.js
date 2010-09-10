(function() {
    // Strictly speaking, this check is redundant because our content script
    // runs only on https pages.  However, I've
    if (document.location.protocol.match(/^http:$/i))
        return;
    document.addEventListener('beforeload', function() {
        if (event.url.match(/^http:/i)) {
            // Block the mixed content (optional).
            event.preventDefault();
            // Report the vulnerability.
            chrome.extension.sendRequest({
                'insecure_url': event.url,
                'document_url': document.location.href,
                'target_node_name': event.target.nodeName,
                'target_id': event.target.getAttribute('id')
            });
        }
    }, true);
})();
