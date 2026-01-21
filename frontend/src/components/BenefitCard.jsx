import { useLanguage } from '../context/LanguageContext';
import './BenefitCard.css';

const CATEGORY_COLORS = {
    travel: 'var(--cat-travel)',
    dining: 'var(--cat-dining)',
    shopping: 'var(--cat-shopping)',
    entertainment: 'var(--cat-entertainment)',
    insurance: 'var(--cat-insurance)',
    lifestyle: 'var(--cat-lifestyle)',
    cashback: 'var(--cat-cashback)',
};

const CATEGORY_ICONS = {
    travel: '✈️',
    dining: '🍽️',
    shopping: '🛍️',
    entertainment: '🎬',
    insurance: '🛡️',
    lifestyle: '💫',
    cashback: '💰',
};

function BenefitCard({ benefit, onViewDetails, style }) {
    const { t } = useLanguage();
    const categoryColor = CATEGORY_COLORS[benefit.category] || 'var(--text-secondary)';

    return (
        <article
            className="benefit-card glass-card animate-fadeIn"
            style={{
                '--category-color': categoryColor,
                ...style
            }}
        >
            <header className="benefit-header">
                <span className={`badge badge-${benefit.category}`}>
                    {CATEGORY_ICONS[benefit.category]} {t(benefit.category)}
                </span>
                {benefit.value && (
                    <span className="benefit-value">{benefit.value}</span>
                )}
            </header>

            <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>

                {benefit.merchant && (
                    <div className="benefit-merchant">
                        <span className="merchant-label">Partner:</span>
                        <span className="merchant-name">{benefit.merchant}</span>
                    </div>
                )}

                {benefit.validity && (
                    <div className="benefit-validity">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                        </svg>
                        {benefit.validity}
                    </div>
                )}
            </div>

            <footer className="benefit-footer">
                <button className="btn btn-ghost" onClick={onViewDetails}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    {t('viewDetails')}
                </button>
            </footer>
        </article>
    );
}

export default BenefitCard;
