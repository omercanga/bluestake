class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = translations;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const browserLang = this.getBrowserLanguage();
            this.setLanguage(browserLang);
            this.setupLanguageButtons();
        });
    }

    getBrowserLanguage() {
        const languages = navigator.languages || [navigator.language || navigator.userLanguage];
        
        for (let lang of languages) {
            const langCode = lang.split('-')[0].toLowerCase();
            if (this.translations[langCode]) {
                return langCode;
            }
        }
        return 'en';
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            lang = 'en';
        }
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = ['ar', 'he'].includes(lang) ? 'rtl' : 'ltr';
        
        this.updateContent();
        this.updateLanguageButtons();
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        
        document.title = t.title;
        document.querySelector('h1').textContent = t.title;

        document.querySelector('[data-lang="validatorAddress"]').textContent = t.validatorAddress;
        document.querySelector('[data-lang="validatorStatus"]').textContent = t.validatorStatus;
        document.querySelector('[data-lang="active"]').textContent = t.active;
        document.querySelector('[data-lang="commission"]').textContent = t.commission;
        document.querySelector('[data-lang="performance"]').textContent = t.performance;
        document.querySelector('[data-lang="totalStaked"]').textContent = t.totalStaked;

        document.querySelector('[data-lang="delegateYourCSPR"]').textContent = t.delegateYourCSPR;
        document.querySelector('[data-lang="joinValidator"]').textContent = t.joinValidator;
        document.querySelector('[data-lang="performanceRate"]').textContent = t.performanceRate;
        document.querySelector('[data-lang="commissionRate"]').textContent = t.commissionRate;
        document.querySelector('[data-lang="infrastructure"]').textContent = t.infrastructure;
        document.querySelector('[data-lang="monitoring"]').textContent = t.monitoring;
        document.querySelector('[data-lang="delegateNow"]').textContent = t.delegateNow;

        document.querySelector('[data-lang="copyright"]').textContent = t.copyright;
    }

    setupLanguageButtons() {
        const container = document.querySelector('.language-selector');
        container.innerHTML = '';
        
        const languageDisplayNames = {
            // Latin script languages
            'en': 'EN', 'tr': 'TR', 'es': 'ES', 'de': 'DE', 'fr': 'FR',
            'it': 'IT', 'pt': 'PT', 'nl': 'NL', 'pl': 'PL', 'cs': 'CS',
            'da': 'DA', 'fi': 'FI', 'ro': 'RO', 'bg': 'BG', 'el': 'EL',
            'uk': 'UA', 'vi': 'VI', 'id': 'ID',
            
            // Non-Latin script languages
            'ru': 'RU', 'ja': 'JP', 'zh': 'CN', 'ko': 'KR',
            'ar': 'AR', 'hi': 'HI', 'th': 'TH', 'he': 'HE'
        };

        // Dilleri iki gruba ayır: Latin alfabesi kullananlar ve diğerleri
        const latinScriptLangs = Object.entries(languageDisplayNames)
            .filter(([code]) => !['ru', 'ja', 'zh', 'ko', 'ar', 'hi', 'th', 'he'].includes(code));
        
        const nonLatinScriptLangs = Object.entries(languageDisplayNames)
            .filter(([code]) => ['ru', 'ja', 'zh', 'ko', 'ar', 'hi', 'th', 'he'].includes(code));

        // Önce Latin alfabesi kullanan dilleri ekle
        latinScriptLangs.forEach(([lang, display]) => {
            this.createLanguageButton(container, lang, display);
        });

        // Sonra diğer dilleri ekle
        nonLatinScriptLangs.forEach(([lang, display]) => {
            this.createLanguageButton(container, lang, display);
        });
    }

    createLanguageButton(container, lang, display) {
        const button = document.createElement('button');
        button.className = 'language-button';
        button.textContent = display;
        if (lang === this.currentLang) {
            button.classList.add('current-lang');
        }
        button.onclick = () => this.setLanguage(lang);
        container.appendChild(button);
    }

    updateLanguageButtons() {
        document.querySelectorAll('.language-button').forEach(button => {
            button.classList.toggle('current-lang', 
                button.textContent.toLowerCase() === this.currentLang);
        });
    }
}

// Dil yöneticisini başlat
const langManager = new LanguageManager(); 