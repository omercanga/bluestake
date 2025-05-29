function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('[data-lang="copyright"]');
    
    copyrightElements.forEach(element => {
        const text = element.textContent;
        // Remove any existing year before adding the new one
        const textWithoutYear = text.replace(/\d{4}/g, '').trim();
        element.textContent = textWithoutYear.replace('©', `© ${currentYear}`);
    });
}

// Update copyright year when the page loads
document.addEventListener('DOMContentLoaded', updateCopyrightYear); 