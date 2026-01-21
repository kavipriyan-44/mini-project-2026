import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { aiAPI, offersAPI } from '../services/api';
import './Recommendations.css';

function Recommendations({ cardInfo, userContext }) {
    const { t } = useLanguage();
    const [recommendations, setRecommendations] = useState('');
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [aiSource, setAiSource] = useState('');

    useEffect(() => {
        if (userContext) {
            loadData();
        }
    }, [cardInfo.card_type, userContext]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [recsResult, offersResult] = await Promise.all([
                aiAPI.recommend(
                    cardInfo.card_type,
                    userContext.location,
                    userContext.lifestyle,
                    userContext.interests
                ),
                offersAPI.getNearby(userContext.location)
            ]);

            setRecommendations(recsResult.result);
            setAiSource(recsResult.source);
            setOffers(offersResult.offers.slice(0, 4));
        } catch (error) {
            console.error('Failed to load recommendations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!userContext) {
        return null;
    }

    return (
        <section className="recommendations-section">
            <div className="section-header">
                <div className="header-content">
                    <h2>
                        <span className="ai-sparkle">✨</span>
                        {t('recommendations')}
                    </h2>
                    <p className="section-subtitle">{t('personalized')}</p>
                </div>
                {aiSource === 'llm' && (
                    <div className="powered-badge">
                        <span className="badge-icon">🤖</span>
                        Llama AI
                    </div>
                )}
            </div>

            <div className="recommendations-grid">
                {/* AI Recommendations */}
                <div className="ai-recommendations glass-card">
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="skeleton" style={{ width: '100%', height: '20px' }}></div>
                            <div className="skeleton" style={{ width: '80%', height: '20px' }}></div>
                            <div className="skeleton" style={{ width: '90%', height: '20px' }}></div>
                        </div>
                    ) : (
                        <div className="recommendations-content">
                            {recommendations.split('\n').filter(line => line.trim()).map((line, i) => (
                                <p key={i} className="rec-line animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Nearby Offers Quick View */}
                <div className="nearby-offers">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {t('nearbyOffers')} • {userContext.location}
                    </h3>

                    <div className="offers-list stagger">
                        {isLoading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="offer-item skeleton-item">
                                    <div className="skeleton" style={{ width: '60%', height: '16px' }}></div>
                                    <div className="skeleton" style={{ width: '40%', height: '14px' }}></div>
                                </div>
                            ))
                        ) : (
                            offers.map((offer, i) => (
                                <div key={offer.id} className="offer-item glass-card animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="offer-header">
                                        <span className="offer-merchant">{offer.merchant_name}</span>
                                        <span className="offer-discount">{offer.discount}</span>
                                    </div>
                                    <p className="offer-title">{offer.offer_title}</p>
                                    {offer.distance_km !== null && (
                                        <span className="offer-distance">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                            </svg>
                                            {offer.distance_km} {t('distance')}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Recommendations;
