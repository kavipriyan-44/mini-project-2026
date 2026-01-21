import { useLanguage } from '../context/LanguageContext';
import './Header.css';

function Header() {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className="header">
            <div className="header-content container">
                <div className="header-brand">
                    <div className="logo">
                        <svg viewBox="0 0 40 40" className="visa-icon">
                            <rect x="2" y="8" width="36" height="24" rx="4" fill="url(#visa-gradient)" />
                            <text x="20" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VISA</text>
                            <defs>
                                <linearGradient id="visa-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1a1f71" />
                                    <stop offset="100%" stopColor="#2d3494" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="brand-text">
                            <h1>{t('appTitle')}</h1>
                            <p>{t('appSubtitle')}</p>
                        </div>
                    </div>
                </div>

                <nav className="header-nav">
                    <button
                        className="lang-toggle"
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                    >
                        <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
                        <span className="lang-divider">/</span>
                        <span className={`lang-option ${language === 'ta' ? 'active' : ''}`}>தமிழ்</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
