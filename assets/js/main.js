class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = translations; // Doğrudan global translations objesini kullan
        this.init();
    }

    init() {
        // Sayfa yüklendiğinde başlat
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupLanguageButtons();
                this.setLanguage(this.currentLang);
            });
        } else {
            this.setupLanguageButtons();
            this.setLanguage(this.currentLang);
        }
    }

    setLanguage(lang) {
        // Dil kontrolü
        if (this.translations && this.translations[lang]) {
            this.currentLang = lang;
            this.updateContent();
            this.updateLanguageButtons();
        }
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        if (!t) return;

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        if (!container) return;

        container.innerHTML = '';
        
        // Sadece mevcut çevirileri olan dilleri göster
        const languages = {
            'en': 'EN',
            'tr': 'TR',
            'es': 'ES',
            'de': 'DE',
            'fr': 'FR'
        };

        Object.entries(languages).forEach(([lang, display]) => {
            const button = document.createElement('button');
            button.className = 'language-button';
            button.textContent = display;
            
            if (lang === this.currentLang) {
                button.classList.add('current-lang');
            }

            button.onclick = () => this.setLanguage(lang);
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

// Dil yöneticisini başlat
const langManager = new LanguageManager(); 