document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('url-form');
    const longUrlInput = document.getElementById('long-url');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const errorMsgDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const shortUrlLink = document.getElementById('short-url-link');
    const copyBtn = document.getElementById('copy-btn');
    const newBtn = document.getElementById('new-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const longUrl = longUrlInput.value.trim();
        if (!longUrl) return;

        // Hide form, show loading
        form.classList.add('hidden');
        errorMsgDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');

        try {
            const response = await fetch('/api/url/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ longUrl })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data || 'Something went wrong');
            }

            // Success, show result
            loadingDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');
            
            shortUrlLink.href = data.shortUrl;
            shortUrlLink.textContent = data.shortUrl;

        } catch (err) {
            // Error, show error message and form again
            loadingDiv.classList.add('hidden');
            form.classList.remove('hidden');
            errorMsgDiv.classList.remove('hidden');
            errorText.textContent = err.message || 'An error occurred connecting to the server.';
            console.error(err);
        }
    });

    copyBtn.addEventListener('click', async () => {
        const textToCopy = shortUrlLink.textContent;
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Visual feedback
            const icon = copyBtn.querySelector('i');
            icon.classList.remove('fa-regular', 'fa-copy');
            icon.classList.add('fa-solid', 'fa-check', 'copy-success');
            
            setTimeout(() => {
                icon.classList.remove('fa-solid', 'fa-check', 'copy-success');
                icon.classList.add('fa-regular', 'fa-copy');
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers could go here
        }
    });

    newBtn.addEventListener('click', () => {
        resultDiv.classList.add('hidden');
        form.classList.remove('hidden');
        longUrlInput.value = '';
        longUrlInput.focus();
    });
});
