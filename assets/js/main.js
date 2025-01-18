class LanguageManager {
    constructor() {
        // Translations objesinin yüklenmesini bekle
        this.waitForTranslations();
    }

    waitForTranslations() {
        if (window.translations) {
            this.translations = window.translations;
            this.initialize();
        } else {
            setTimeout(() => this.waitForTranslations(), 100);
        }
    }

    initialize() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.setupLanguageButtons();
        this.applyLanguage(this.currentLang);
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        if (!container) return;

        container.innerHTML = '';

        const languages = {
            'en': 'English',
            'tr': 'Türkçe',
            'es': 'Español',
            'de': 'Deutsch',
            'fr': 'Français',
            'it': 'Italiano',
            'pt': 'Português',
            'nl': 'Nederlands',
            'pl': 'Polski'
        };

        Object.entries(languages).forEach(([code, name]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'language-button';
            button.textContent = code.toUpperCase();
            button.title = name;

            if (code === this.currentLang) {
                button.classList.add('current-lang');
            }

            button.addEventListener('click', () => {
                if (this.translations && this.translations[code]) {
                    this.applyLanguage(code);
                }
            });

            container.appendChild(button);
        });
    }

    applyLanguage(lang) {
        // Dil çevirilerinin varlığını kontrol et
        if (!this.translations || !this.translations[lang]) {
            console.warn(`No translations found for ${lang}, falling back to English`);
            lang = 'en';
            
            // İngilizce çeviriler de yoksa işlemi durdur
            if (!this.translations || !this.translations[lang]) {
                console.error('No translations available');
                return;
            }
        }

        // Dili ayarla
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        // Çevirileri uygula
        this.translatePage();
        this.updateButtons();
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
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

    updateButtons() {
        const buttons = document.querySelectorAll('.language-button');
        buttons.forEach(button => {
            button.classList.remove('current-lang');
            if (button.textContent === this.currentLang.toUpperCase()) {
                button.classList.add('current-lang');
            }
        });
    }
}

// Sayfa yüklendiğinde dil yöneticisini başlat
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
}); 