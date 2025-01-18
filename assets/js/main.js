class LanguageManager {
    constructor() {
        // Translations kontrolü
        if (typeof translations === 'undefined') {
            console.error('Translations not found!');
            return;
        }

        this.translations = translations;
        this.currentLang = 'en';
        this.init();
    }

    init() {
        const container = document.querySelector('.language-selector');
        if (!container) {
            console.error('Language selector container not found!');
            return;
        }

        // Dil butonlarını oluştur
        this.createButtons(container);
        // Varsayılan dili uygula
        this.setLanguage('en');
    }

    createButtons(container) {
        const languages = [
            { code: 'en', label: 'EN' },
            { code: 'tr', label: 'TR' }
        ];

        languages.forEach(lang => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'language-button';
            btn.textContent = lang.label;
            btn.onclick = () => this.setLanguage(lang.code);
            container.appendChild(btn);
        });
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`No translations for ${lang}`);
            return;
        }

        this.currentLang = lang;
        this.updateContent();
        this.updateButtons();
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (t[key]) el.textContent = t[key];
        });
    }

    updateButtons() {
        document.querySelectorAll('.language-button').forEach(btn => {
            btn.classList.toggle('current-lang', 
                btn.textContent === this.currentLang.toUpperCase());
        });
    }
}

// Sayfa yüklendikten sonra başlat
window.addEventListener('load', () => {
    new LanguageManager();
}); 