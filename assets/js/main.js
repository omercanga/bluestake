class LanguageManager {
    constructor() {
        // Translations objesinin varlığını kontrol et
        if (typeof translations === 'undefined') {
            console.error('Translations object not found!');
            return;
        }

        this.translations = translations;
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.init();
    }

    init() {
        console.log('Initializing Language Manager');
        console.log('Current language:', this.currentLang);
        console.log('Available translations:', Object.keys(this.translations));

        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found');
            return;
        }

        this.createLanguageButtons(container);
        this.applyLanguage(this.currentLang);
    }

    createLanguageButtons(container) {
        container.innerHTML = '';

        // Desteklenen diller
        const supportedLanguages = [
            { code: 'en', name: 'English' },
            { code: 'tr', name: 'Türkçe' },
            { code: 'es', name: 'Español' },
            { code: 'de', name: 'Deutsch' },
            { code: 'fr', name: 'Français' }
        ];

        supportedLanguages.forEach(lang => {
            // Sadece çevirisi olan dilleri göster
            if (this.translations[lang.code]) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'language-button';
                button.textContent = lang.code.toUpperCase();
                button.title = lang.name;

                if (lang.code === this.currentLang) {
                    button.classList.add('current-lang');
                }

                button.addEventListener('click', () => {
                    console.log(`Switching to ${lang.code}`);
                    this.applyLanguage(lang.code);
                });

                container.appendChild(button);
            }
        });
    }

    applyLanguage(lang) {
        // Dil çevirisinin varlığını kontrol et
        if (!this.translations[lang]) {
            console.error(`No translations found for ${lang}, falling back to English`);
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        this.updatePageContent();
        this.updateLanguageButtons();
    }

    updatePageContent() {
        const translations = this.translations[this.currentLang];
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = translations[key];

            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${this.currentLang}`);
            }
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

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Language Manager');
    window.langManager = new LanguageManager();
}); 