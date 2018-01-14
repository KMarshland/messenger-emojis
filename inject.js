(function() {

    let replacementInterval = null;

    function replace() {
        if (!$('._aok span').length) {

            console.log('Waiting for messages to load...');
            setTimeout(replace, 250);

            if (replacementInterval) {
                clearInterval(replacementInterval);
            }

            return;
        }


        $('._aok span').each(function () {
            let content = $(this).html();

            if (!/:[^:]+:/.test(content)) {
                return;
            }

            content = content.replace(/:([^:]+):/g, function(match, emoji){
                const emojiUrl = window.SLACK_EMOJI_URLS[emoji];
                if (!emojiUrl) {
                    return match;
                }

                return '<img src="' + emojiUrl + '" style="max-width: 30px">';
            });

            $(this).html(content);
        });

        replacementInterval = setInterval(replace, 1000);
    }

    replace();

})();