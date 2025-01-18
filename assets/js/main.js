class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.translations = translations;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setLanguage(this.currentLang);
            this.setupLanguageButtons();
        });
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            lang = 'en';
        }
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = ['ar', 'he'].includes(lang) ? 'rtl' : 'ltr';
        
        this.updateContent();
        this.updateLanguageButtons();
    }

    updateContent() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = this.translations[this.currentLang][key];
                } else {
                    element.textContent = this.translations[this.currentLang][key];
                }
            }
        });
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        if (!container) return;
        
        container.innerHTML = '';
        
        const languageDisplayNames = {
            'en': 'EN',
            'tr': 'TR',
            'es': 'ES',
            'de': 'DE',
            'fr': 'FR',
            'it': 'IT',
            'pt': 'PT',
            'nl': 'NL',
            'pl': 'PL'
        };

        Object.entries(languageDisplayNames).forEach(([lang, display]) => {
            const button = document.createElement('button');
            button.className = 'language-button';
            button.textContent = display;
            
            if (lang === this.currentLang) {
                button.classList.add('current-lang');
            }
            
            button.addEventListener('click', () => this.setLanguage(lang));
            container.appendChild(button);
        });
    }

    updateLanguageButtons() {
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.remove('current-lang');
            if (button.textContent.toLowerCase() === this.currentLang.toUpperCase()) {
                button.classList.add('current-lang');
            }
        });
    }
}

// Initialize language manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
}); 