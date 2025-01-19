class LanguageManager {
    constructor() {
        // Translations objesinin varlığını kontrol et
        if (typeof translations === 'undefined') {
            console.error('Translations object not found!');
            return;
        }

        this.translations = translations;
        
        // Önce localStorage'dan, yoksa tarayıcı dilinden, o da yoksa varsayılan olarak 'en'
        this.currentLang = this.getInitialLanguage();
        
        // DOM yüklendiğinde başlat
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    getInitialLanguage() {
        // Önce localStorage'a bak
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang && this.translations[savedLang]) {
            return savedLang;
        }

        // Tarayıcı dilini kontrol et
        const browserLang = navigator.language.split('-')[0];
        if (this.translations[browserLang]) {
            return browserLang;
        }

        // Varsayılan dil
        return 'en';
    }

    init() {
        console.log('Initializing with language:', this.currentLang);
        
        // Dil seçici container'ı bul
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found');
            return;
        }

        // Dil butonlarını oluştur
        this.setupLanguageButtons(container);
        
        // Başlangıç dilini uygula
        this.applyLanguage(this.currentLang);
    }

    setupLanguageButtons(container) {
        container.innerHTML = '';

        // Desteklenen diller ve etiketleri
        const languages = [
            { code: 'en', label: 'EN', name: 'English' },
            { code: 'tr', label: 'TR', name: 'Türkçe' },
            { code: 'es', label: 'ES', name: 'Español' },
            { code: 'de', label: 'DE', name: 'Deutsch' },
            { code: 'fr', label: 'FR', name: 'Français' }
        ];

        languages.forEach(lang => {
            if (this.translations[lang.code]) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'language-button';
                button.textContent = lang.label;
                button.title = lang.name;
                
                if (lang.code === this.currentLang) {
                    button.classList.add('current-lang');
                }

                button.onclick = () => {
                    console.log(`Changing language to: ${lang.code}`);
                    this.applyLanguage(lang.code);
                };

                container.appendChild(button);
            }
        });
    }

    applyLanguage(lang) {
        // Dil çevirilerinin varlığını kontrol et
        if (!this.translations[lang]) {
            console.error(`No translations found for ${lang}`);
            return;
        }

        // Dili ayarla
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        // Sayfa içeriğini güncelle
        this.updateContent();
        
        // Aktif dil butonunu güncelle
        this.updateActiveButton();
    }

    updateContent() {
        const currentTranslations = this.translations[this.currentLang];
        
        // Tüm çevrilebilir elementleri bul ve güncelle
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = currentTranslations[key];

            if (translation) {
                // Element tipine göre çeviriyi uygula
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                    element.setAttribute('content', translation);
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${this.currentLang}`);
            }
        });

        // Sayfa başlığını güncelle
        if (currentTranslations.title) {
            document.title = currentTranslations.title;
        }
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

// Sayfa yüklendiğinde dil yöneticisini başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting Language Manager');
    window.langManager = new LanguageManager();
}); 