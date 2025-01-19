class LanguageManager {
    constructor() {
        // Global translations objesinin varlığını kontrol et
        if (typeof window.translations === 'undefined') {
            console.error('Translations object is not loaded!');
            return;
        }

        // Translations objesini ve varsayılan dili ayarla
        this.translations = window.translations;
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        
        // DOM yüklendiğinde başlat
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        // Dil seçici container'ı bul
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found!');
            return;
        }

        // Dil butonlarını oluştur ve varsayılan dili uygula
        this.setupLanguageButtons(container);
        this.applyLanguage(this.currentLang);
    }

    setupLanguageButtons(container) {
        // Container'ı temizle
        container.innerHTML = '';

        // Dil gruplarını tanımla
        const primaryLanguages = ['en', 'tr', 'es', 'de', 'fr'];
        const secondaryLanguages = ['it', 'pt', 'nl', 'pl', 'ru'];
        const tertiaryLanguages = ['cs', 'da', 'fi', 'ro', 'bg', 'el', 'uk', 'vi', 'id', 'ja', 'zh', 'ko', 'ar', 'hi', 'th', 'he'];

        // Dil gruplarını sırayla ekle
        this.addLanguageGroup(container, primaryLanguages);
        this.addLanguageGroup(container, secondaryLanguages);
        this.addLanguageGroup(container, tertiaryLanguages);
    }

    addLanguageGroup(container, languages) {
        languages.forEach(lang => {
            // Sadece çevirisi olan dilleri ekle
            if (this.translations[lang]) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'language-button';
                button.textContent = lang.toUpperCase();
                
                if (lang === this.currentLang) {
                    button.classList.add('current-lang');
                }

                button.addEventListener('click', () => {
                    this.applyLanguage(lang);
                });

                container.appendChild(button);
            }
        });
    }

    applyLanguage(lang) {
        // Dil çevirilerinin varlığını kontrol et
        if (!this.translations[lang]) {
            console.error(`Translations not found for language: ${lang}`);
            return;
        }

        // Dili ayarla ve kaydet
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        // İçeriği güncelle
        this.updateContent();
        this.updateActiveButton();
    }

    updateContent() {
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
            }
        });
    }

    updateActiveButton() {
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.toggle('current-lang', 
                button.textContent === this.currentLang.toUpperCase());
        });
    }
}

// Sayfa tamamen yüklendiğinde dil yöneticisini başlat
window.addEventListener('load', () => {
    const langManager = new LanguageManager();
}); 