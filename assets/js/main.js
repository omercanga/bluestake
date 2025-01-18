class LanguageManager {
    constructor() {
        // DOM yüklendiğinde başlat
        document.addEventListener('DOMContentLoaded', () => {
            this.initialize();
        });
    }

    initialize() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.translations = window.translations || {};
        
        // Dil seçiciyi oluştur
        this.createLanguageSelector();
        // Mevcut dili uygula
        this.applyLanguage(this.currentLang);
    }

    createLanguageSelector() {
        const container = document.querySelector('.language-selector');
        if (!container) return;

        // Mevcut butonları temizle
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

        // Her dil için buton oluştur
        Object.entries(languages).forEach(([code, name]) => {
            const button = document.createElement('button');
            button.type = 'button'; // Explicitly set type
            button.className = 'language-button';
            button.textContent = code.toUpperCase();
            button.title = name; // Tooltip olarak tam dil adını göster
            
            if (code === this.currentLang) {
                button.classList.add('current-lang');
            }

            button.addEventListener('click', () => {
                this.applyLanguage(code);
            });

            container.appendChild(button);
        });
    }

    applyLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Translation not found for language: ${lang}`);
            lang = 'en'; // Fallback to English
        }

        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        // Tüm çevirileri uygula
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = this.translations[lang]?.[key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Aktif dil butonunu güncelle
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.toggle('current-lang', 
                button.textContent === this.currentLang.toUpperCase());
        });
    }
}

// Dil yöneticisini başlat
const languageManager = new LanguageManager(); 