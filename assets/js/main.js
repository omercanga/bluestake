class LanguageManager {
    constructor() {
        // Translations objesini global scope'dan al
        this.translations = window.translations;
        
        // DOM yüklendiğinde başlat
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Başlangıç dilini al veya varsayılan olarak 'en' kullan
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        
        // Dil seçiciyi oluştur ve dili uygula
        this.setupLanguageButtons();
        this.setLanguage(this.currentLang);
        
        // Debug için kontrol
        console.log('Language Manager initialized', {
            currentLang: this.currentLang,
            translations: this.translations
        });
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found');
            return;
        }

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

            // Click event'ini bind ile bağlayalım
            button.addEventListener('click', this.handleLanguageClick.bind(this, lang));
            
            container.appendChild(button);
        });
    }

    handleLanguageClick(lang, event) {
        event.preventDefault();
        console.log(`Changing language to: ${lang}`); // Debug için
        this.setLanguage(lang);
    }

    setLanguage(lang) {
        if (!this.translations || !this.translations[lang]) {
            console.warn(`Translations not found for: ${lang}, falling back to English`);
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        this.updateContent();
        this.updateActiveButton();
    }

    updateContent() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = this.translations[this.currentLang]?.[key];

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

    updateActiveButton() {
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.remove('current-lang');
            if (button.textContent === this.currentLang.toUpperCase()) {
                button.classList.add('current-lang');
            }
        });
    }
}

// Dil yöneticisini başlat
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
}); 