class LanguageManager {
    constructor() {
        // Global translations objesini al
        this.translations = window.translations || translations;
        this.currentLang = 'en';
        
        // DOM yüklendiğinde başlat
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Language Manager');
        console.log('Translations:', this.translations);
        
        this.setupLanguageButtons();
        this.setLanguage(this.currentLang);
    }

    setLanguage(lang) {
        console.log('Setting language to:', lang);
        
        if (this.translations && this.translations[lang]) {
            this.currentLang = lang;
            this.updateContent();
            this.updateLanguageButtons();
        } else {
            console.error('Translations not found for:', lang);
        }
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        if (!t) {
            console.error('No translations found for:', this.currentLang);
            return;
        }

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found');
            return;
        }

        console.log('Setting up language buttons');
        container.innerHTML = '';

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

            button.onclick = () => {
                console.log('Language button clicked:', lang);
                this.setLanguage(lang);
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

// Dil yöneticisini başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting Language Manager');
    window.langManager = new LanguageManager();
}); 