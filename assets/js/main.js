class LanguageManager {
    constructor() {
        // Global translations objesini al
        this.translations = translations;
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
        console.log('Available translations:', this.translations);
        
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found');
            return;
        }

        this.setupLanguageButtons(container);
        this.setLanguage(this.currentLang);
    }

    setupLanguageButtons(container) {
        container.innerHTML = '';

        // Ana diller
        const languages = [
            { code: 'en', label: 'EN' },
            { code: 'tr', label: 'TR' },
            { code: 'es', label: 'ES' },
            { code: 'de', label: 'DE' },
            { code: 'fr', label: 'FR' }
        ];

        languages.forEach(lang => {
            if (this.translations[lang.code]) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'language-button';
                button.textContent = lang.label;
                
                if (lang.code === this.currentLang) {
                    button.classList.add('current-lang');
                }

                button.onclick = () => {
                    console.log('Changing language to:', lang.code);
                    this.setLanguage(lang.code);
                };

                container.appendChild(button);
            }
        });
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error('No translations found for:', lang);
            return;
        }

        this.currentLang = lang;
        this.updateContent();
        this.updateButtons();
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
    }

    updateButtons() {
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
    console.log('DOM loaded, starting Language Manager');
    new LanguageManager();
}); 