import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cardAPI } from '../services/api';
import './CardInput.css';

const TEST_CARDS = [
    { number: '4000000000000000', type: 'Classic', tier: 'Standard' },
    { number: '4000000000001000', type: 'Gold', tier: 'Premium' },
    { number: '4000000000002000', type: 'Platinum', tier: 'Elite' },
    { number: '4000000000003000', type: 'Signature', tier: 'Luxury' },
];

function CardInput({ onCardValidated }) {
    const { t } = useLanguage();
    const [cardNumber, setCardNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showTestCards, setShowTestCards] = useState(false);

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 16);
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : '';
    };

    const handleInputChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanNumber = cardNumber.replace(/\s/g, '');

        if (cleanNumber.length !== 16) {
            setError(t('invalidCard'));
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await cardAPI.validate(cleanNumber);
            onCardValidated(result);
        } catch (err) {
            setError(err.message || t('serverError'));
        } finally {
            setIsLoading(false);
        }
    };

    const selectTestCard = (number) => {
        setCardNumber(formatCardNumber(number));
        setShowTestCards(false);
        setError('');
    };

    return (
        <section className="card-input-section">
            <div className="card-visual">
                <div className={`credit-card ${cardNumber.length > 4 ? 'card-gold' : ''}`}>
                    <div className="card-chip"></div>
                    <div className="card-number">
                        {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-footer">
                        <span className="card-holder">CARDHOLDER</span>
                        <span className="card-brand">VISA</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="card-form">
                <h2>{t('enterCard')}</h2>

                <div className="input-wrapper">
                    <input
                        type="text"
                        className={`input-field card-input ${error ? 'error' : ''}`}
                        placeholder={t('cardPlaceholder')}
                        value={cardNumber}
                        onChange={handleInputChange}
                        autoComplete="off"
                        inputMode="numeric"
                    />
                    <div className="input-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                        </svg>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isLoading || cardNumber.length < 19}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            {t('validating')}
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z" />
                            </svg>
                            {t('validateBtn')}
                        </>
                    )}
                </button>

                <div className="test-cards-section">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setShowTestCards(!showTestCards)}
                    >
                        {t('testCards')}
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"
                            style={{ transform: showTestCards ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                    </button>

                    {showTestCards && (
                        <div className="test-cards-list animate-slideUp">
                            {TEST_CARDS.map((card) => (
                                <button
                                    key={card.number}
                                    type="button"
                                    className="test-card-btn"
                                    onClick={() => selectTestCard(card.number)}
                                >
                                    <span className="test-card-type">{card.type}</span>
                                    <span className="test-card-number">{formatCardNumber(card.number)}</span>
                                    <span className={`test-card-tier tier-${card.tier.toLowerCase()}`}>{card.tier}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
}

export default CardInput;
