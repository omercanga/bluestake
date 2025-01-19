class LanguageManager {
    constructor() {
        // Translations objesinin varlığını kontrol et
        if (typeof translations === 'undefined') {
            console.error('Translations object not found!');
            return;
        }

        this.translations = translations;
        this.currentLang = this.getInitialLanguage();
        
        console.log('Translations loaded:', Object.keys(this.translations));
        
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
        
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found');
            return;
        }

        this.setupLanguageButtons(container);
        this.applyLanguage(this.currentLang);
    }

    setupLanguageButtons(container) {
        container.innerHTML = '';
        
        // Dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';

        // Current language button
        const currentBtn = document.createElement('button');
        currentBtn.className = 'language-current';
        currentBtn.innerHTML = `
            <span>${this.currentLang.toUpperCase()}</span>
        `;
        
        // Language list container
        const listContainer = document.createElement('div');
        listContainer.className = 'language-list';

        // Dilleri grupla
        const primaryLanguages = ['en', 'tr', 'es', 'de', 'fr'];
        const secondaryLanguages = ['it', 'pt', 'nl', 'pl', 'ru'];
        const otherLanguages = ['ja', 'zh', 'ko', 'ar', 'hi', 'th', 'vi', 'id', 'cs', 'el', 'he', 'da', 'fi', 'ro', 'bg', 'uk'];

        const allLanguages = [
            ...primaryLanguages.map(code => ({ code, primary: true })),
            ...secondaryLanguages.map(code => ({ code, primary: false })),
            ...otherLanguages.map(code => ({ code, primary: false }))
        ];

        // Dil seçeneklerini oluştur
        allLanguages.forEach(({ code }) => {
            if (this.translations[code]) {
                const option = document.createElement('div');
                option.className = 'language-option';
                if (code === this.currentLang) {
                    option.classList.add('current');
                }
                
                option.innerHTML = `
                    <span>${code.toUpperCase()}</span>
                    <span>${this.getLanguageName(code)}</span>
                `;

                option.onclick = (e) => {
                    e.stopPropagation();
                    this.applyLanguage(code);
                    dropdown.classList.remove('active');
                };

                listContainer.appendChild(option);
            }
        });

        // Click olaylarını ekle
        currentBtn.onclick = () => {
            dropdown.classList.toggle('active');
        };

        // Dışarı tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Elementleri birleştir
        dropdown.appendChild(currentBtn);
        dropdown.appendChild(listContainer);
        container.appendChild(dropdown);
    }

    getLanguageName(code) {
        const names = {
            'en': 'English',
            'tr': 'Türkçe',
            'es': 'Español',
            'de': 'Deutsch',
            'fr': 'Français',
            'it': 'Italiano',
            'pt': 'Português',
            'nl': 'Nederlands',
            'pl': 'Polski',
            'ru': 'Русский',
            'ja': '日本語',
            'zh': '中文',
            'ko': '한국어',
            'ar': 'العربية',
            'hi': 'हिंदी',
            'th': 'ไทย',
            'vi': 'Tiếng Việt',
            'id': 'Bahasa Indonesia',
            'cs': 'Čeština',
            'el': 'Ελληνικά',
            'he': 'עברית',
            'da': 'Dansk',
            'fi': 'Suomi',
            'ro': 'Română',
            'bg': 'Български',
            'uk': 'Українська'
        };
        return names[code] || code.toUpperCase();
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
        const currentBtn = document.querySelector('.language-current span');
        if (currentBtn) {
            currentBtn.textContent = this.currentLang.toUpperCase();
        }

        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('current');
            if (option.querySelector('span').textContent === this.currentLang.toUpperCase()) {
                option.classList.add('current');
            }
        });
    }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
}); 