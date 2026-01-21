import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { benefitsAPI } from '../services/api';
import BenefitCard from './BenefitCard';
import TCModal from './TCModal';
import './BenefitsDashboard.css';

const CATEGORY_ICONS = {
    travel: '✈️',
    dining: '🍽️',
    shopping: '🛍️',
    entertainment: '🎬',
    insurance: '🛡️',
    lifestyle: '💫',
    cashback: '💰',
};

function BenefitsDashboard({ cardInfo }) {
    const { t } = useLanguage();
    const [benefits, setBenefits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [modalBenefit, setModalBenefit] = useState(null);

    useEffect(() => {
        loadBenefits();
    }, [cardInfo.card_type]);

    const loadBenefits = async () => {
        setIsLoading(true);
        try {
            const data = await benefitsAPI.getByCardType(cardInfo.card_type);
            setBenefits(data.benefits);
            setCategories(['all', ...data.categories]);
        } catch (error) {
            console.error('Failed to load benefits:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredBenefits = selectedCategory === 'all'
        ? benefits
        : benefits.filter(b => b.category === selectedCategory);

    const getCardTierClass = () => {
        const type = cardInfo.card_type.toLowerCase();
        if (type.includes('signature')) return 'tier-signature';
        if (type.includes('platinum')) return 'tier-platinum';
        if (type.includes('gold')) return 'tier-gold';
        return 'tier-classic';
    };

    return (
        <section className="benefits-dashboard">
            {/* Card Summary Header */}
            <div className={`card-summary glass-card ${getCardTierClass()}`}>
                <div className="card-info">
                    <div className="card-badge">
                        <span className="card-type">Visa {cardInfo.card_type}</span>
                        <span className="card-last-four">•••• {cardInfo.last_four}</span>
                    </div>
                    <div className="benefits-count">
                        <span className="count">{benefits.length}</span>
                        <span className="label">{t('totalBenefits')}</span>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat !== 'all' && <span className="cat-icon">{CATEGORY_ICONS[cat]}</span>}
                        <span>{t(cat)}</span>
                    </button>
                ))}
            </div>

            {/* Benefits Grid */}
            {isLoading ? (
                <div className="benefits-grid stagger">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="benefit-skeleton glass-card">
                            <div className="skeleton" style={{ width: '60%', height: '20px' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '40px', marginTop: '12px' }}></div>
                            <div className="skeleton" style={{ width: '40%', height: '16px', marginTop: '12px' }}></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="benefits-grid stagger">
                    {filteredBenefits.map((benefit, index) => (
                        <BenefitCard
                            key={benefit.id}
                            benefit={benefit}
                            onViewDetails={() => setModalBenefit(benefit)}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        />
                    ))}
                </div>
            )}

            {filteredBenefits.length === 0 && !isLoading && (
                <div className="no-benefits">
                    <p>No benefits found in this category</p>
                </div>
            )}

            {/* T&C Modal */}
            {modalBenefit && (
                <TCModal
                    benefit={modalBenefit}
                    onClose={() => setModalBenefit(null)}
                />
            )}
        </section>
    );
}

export default BenefitsDashboard;
