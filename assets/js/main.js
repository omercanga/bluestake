class LanguageManager {
    constructor() {
        // Global translations objesini al
        this.translations = window.translations;
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.init();
    }

    init() {
        if (!this.translations) {
            console.error('Translations not loaded, retrying...');
            setTimeout(() => this.init(), 100);
            return;
        }

        const browserLang = this.getBrowserLanguage();
        this.setLanguage(browserLang);
        this.setupLanguageButtons();
    }

    getBrowserLanguage() {
        const languages = navigator.languages || [navigator.language || navigator.userLanguage];
        
        for (let lang of languages) {
            const langCode = lang.split('-')[0].toLowerCase();
            if (this.translations[langCode]) {
                return langCode;
            }
        }
        return 'en';
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            lang = 'en';
        }
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;
        
        this.updateContent();
        this.updateLanguageButtons();
    }

    updateContent() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = this.translations[this.currentLang][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        if (!container) return;
        
        container.innerHTML = '';
        
        const languages = {
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

        Object.entries(languages).forEach(([lang, display]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'language-button';
            button.textContent = display;
            
            if (lang === this.currentLang) {
                button.classList.add('current-lang');
            }
            
            button.onclick = () => {
                if (this.translations && this.translations[lang]) {
                    this.setLanguage(lang);
                }
            };
            
            container.appendChild(button);
        });
    }

    updateLanguageButtons() {
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.remove('current-lang');
            if (button.textContent === this.currentLang.toUpperCase()) {
                button.classList.add('current-lang');
            }
        });
    }
}

// Sayfa yüklendiğinde dil yöneticisini başlat
window.addEventListener('load', () => {
    new LanguageManager();
}); 