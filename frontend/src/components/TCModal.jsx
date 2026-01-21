import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { aiAPI } from '../services/api';
import './TCModal.css';

function TCModal({ benefit, onClose }) {
    const { language, t } = useLanguage();
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [summarySource, setSummarySource] = useState('');

    const handleSummarize = async () => {
        setIsLoading(true);
        try {
            const result = await aiAPI.summarize(benefit.terms_and_conditions, language);
            setSummary(result.result);
            setSummarySource(result.source);
        } catch (error) {
            setSummary('Unable to generate summary. Please try again.');
            setSummarySource('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content tc-modal">
                <header className="modal-header">
                    <div className="modal-title-group">
                        <h2>{benefit.title}</h2>
                        {benefit.value && <span className="modal-value">{benefit.value}</span>}
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </header>

                <div className="modal-body">
                    {/* Full Terms Section */}
                    <section className="tc-section">
                        <h3>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                            </svg>
                            {t('termsAndConditions')}
                        </h3>
                        <div className="tc-content">
                            <p>{benefit.terms_and_conditions}</p>
                        </div>
                    </section>

                    {/* AI Summary Section */}
                    <section className="summary-section">
                        <div className="summary-header">
                            <h3>
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                {t('simplifiedSummary')}
                            </h3>
                            {!summary && (
                                <button
                                    className="btn btn-primary summarize-btn"
                                    onClick={handleSummarize}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner"></span>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
                                            </svg>
                                            {t('summarize')}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {summary && (
                            <div className={`summary-result ${summarySource}`}>
                                {summarySource === 'llm' && (
                                    <div className="ai-badge">
                                        <span className="ai-icon">🤖</span>
                                        Powered by Llama AI
                                    </div>
                                )}
                                <div className="summary-text">
                                    {summary.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Additional Info */}
                    {(benefit.merchant || benefit.validity) && (
                        <section className="additional-info">
                            {benefit.merchant && (
                                <div className="info-item">
                                    <span className="info-label">Partner</span>
                                    <span className="info-value">{benefit.merchant}</span>
                                </div>
                            )}
                            {benefit.validity && (
                                <div className="info-item">
                                    <span className="info-label">Valid</span>
                                    <span className="info-value">{benefit.validity}</span>
                                </div>
                            )}
                        </section>
                    )}
                </div>

                <footer className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        {t('close')}
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default TCModal;
