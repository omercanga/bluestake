class LanguageManager {
    constructor() {
        if (typeof translations === 'undefined') {
            console.error('Translations not found!');
            return;
        }

        this.translations = translations;
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
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
        this.setLanguage(this.currentLang);
    }

    createButtons(container) {
        // Dilleri grupla
        const mainLanguages = {
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

        const otherLanguages = {
            'cs': 'CS',
            'da': 'DA',
            'fi': 'FI',
            'ro': 'RO',
            'bg': 'BG',
            'el': 'EL',
            'uk': 'UA',
            'vi': 'VI',
            'id': 'ID',
            'ru': 'RU',
            'ja': 'JP',
            'zh': 'CN',
            'ko': 'KR',
            'ar': 'AR',
            'hi': 'HI',
            'th': 'TH',
            'he': 'HE'
        };

        container.innerHTML = '';

        // Önce ana dilleri ekle
        Object.entries(mainLanguages).forEach(([code, label]) => {
            if (this.translations[code]) {
                this.createButton(container, code, label);
            }
        });

        // Sonra diğer dilleri ekle
        Object.entries(otherLanguages).forEach(([code, label]) => {
            if (this.translations[code]) {
                this.createButton(container, code, label);
            }
        });
    }

    createButton(container, code, label) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'language-button';
        btn.textContent = label;
        if (code === this.currentLang) {
            btn.classList.add('current-lang');
        }
        btn.onclick = () => this.setLanguage(code);
        container.appendChild(btn);
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`No translations for ${lang}`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;
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