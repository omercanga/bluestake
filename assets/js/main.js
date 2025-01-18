class LanguageManager {
    constructor() {
        // Translations objesini global scope'dan al
        this.translations = window.translations;
        this.init();
    }

    init() {
        // Translations kontrolü
        if (!this.translations) {
            console.error('Translations not loaded. Waiting for translations...');
            setTimeout(() => this.init(), 100); // Tekrar dene
            return;
        }

        // Başlangıç dilini al
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        
        // Dil seçiciyi oluştur ve dili uygula
        this.setupLanguageButtons();
        this.setLanguage(this.currentLang);
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
                } else {
                    console.error(`Translations not available for ${lang}`);
                }
            };
            
            container.appendChild(button);
        });
    }

    setLanguage(lang) {
        // Güvenlik kontrolü
        if (!this.translations || !this.translations[lang]) {
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        this.updateContent();
        this.updateActiveButton();
    }

    updateContent() {
        if (!this.translations || !this.translations[this.currentLang]) return;

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

    updateActiveButton() {
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.remove('current-lang');
            if (button.textContent === this.currentLang.toUpperCase()) {
                button.classList.add('current-lang');
            }
        });
    }
}

// Script yükleme sırasını bekle
document.addEventListener('DOMContentLoaded', () => {
    // languages.js'in yüklenmesini bekle
    const checkTranslations = () => {
        if (window.translations) {
            new LanguageManager();
        } else {
            setTimeout(checkTranslations, 100);
        }
    };
    checkTranslations();
}); 