function generateCode() {
    var text = document.getElementById('text').value;
    var link = document.getElementById('link').value;

    // Escape any double quotes in the text to prevent issues in the code snippet
    text = text.replace(/"/g, '&quot;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');

    var obfuscatedText = btoa(text);
    var obfuscatedLink = btoa(link);

    var jsCode = `
        <script>
            /* Used Postforest Tool */
            var decodedText = atob("${obfuscatedText}");
            var decodedLink = atob("${obfuscatedLink}");

            (function() {
                var originalText = decodedText;
                var originalLink = decodedLink;

                function checkFooter() {
                    var footer = document.getElementById('my-footer');
                    if (!footer || footer.innerText !== originalText) {
                        window.location.href = originalLink;
                    }
                }

                setInterval(checkFooter, 1000);

                window.addEventListener('DOMContentLoaded', function() {
                    checkFooter();
                });

                window.addEventListener('beforeunload', function(event) {
                    var confirmationMessage = 'Leaving this page will disable the redirection.';
                    event.returnValue = confirmationMessage;
                    return confirmationMessage;
                });
            })();
        <\/script>
    `;

    var code = `
<!DOCTYPE html>
<html>
<head>
<title>Your Website</title>
</head>
<body>

<footer id="my-footer">
${text}
</footer>

${jsCode}

</body>
</html>`;

    var resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Please wait 15 seconds...';

    setTimeout(function() {
        var codeChars = code.split('');
        var index = 0;

        var displayCode = setInterval(function() {
            if (index < codeChars.length) {
                resultElement.innerHTML += codeChars[index];
                index++;
            } else {
                clearInterval(displayCode);
            }
        }, 20);
    }, 15000);
}