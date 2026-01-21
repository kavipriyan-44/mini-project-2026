import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './UserContext.css';

const LIFESTYLE_OPTIONS = [
    { id: 'student', label: 'Student', labelTa: 'மாணவர்', icon: '🎓' },
    { id: 'professional', label: 'Working Professional', labelTa: 'தொழில்முறை', icon: '💼' },
    { id: 'business', label: 'Business Owner', labelTa: 'வணிக உரிமையாளர்', icon: '🏢' },
    { id: 'freelancer', label: 'Freelancer', labelTa: 'சுதந்திர தொழிலாளி', icon: '💻' },
    { id: 'retired', label: 'Retired', labelTa: 'ஓய்வு பெற்றவர்', icon: '🌴' },
];

const INTEREST_OPTIONS = [
    { id: 'travel', label: 'Travel', labelTa: 'பயணம்', icon: '✈️' },
    { id: 'food', label: 'Food & Dining', labelTa: 'உணவு', icon: '🍽️' },
    { id: 'shopping', label: 'Shopping', labelTa: 'ஷாப்பிங்', icon: '🛍️' },
    { id: 'entertainment', label: 'Entertainment', labelTa: 'பொழுதுபோக்கு', icon: '🎬' },
    { id: 'technology', label: 'Technology', labelTa: 'தொழில்நுட்பம்', icon: '📱' },
    { id: 'fitness', label: 'Fitness & Health', labelTa: 'உடற்பயிற்சி', icon: '💪' },
    { id: 'academics', label: 'Academics & Research', labelTa: 'கல்வி', icon: '📚' },
    { id: 'gaming', label: 'Gaming', labelTa: 'விளையாட்டு', icon: '🎮' },
];

const LOCATION_PRESETS = [
    { id: 'iit-chennai', label: 'IIT Chennai (Madras)', value: 'IIT Chennai' },
    { id: 'chennai', label: 'Chennai', value: 'Chennai' },
    { id: 'bangalore', label: 'Bangalore', value: 'Bangalore' },
    { id: 'mumbai', label: 'Mumbai', value: 'Mumbai' },
    { id: 'delhi', label: 'Delhi NCR', value: 'Delhi' },
    { id: 'hyderabad', label: 'Hyderabad', value: 'Hyderabad' },
    { id: 'other', label: 'Other', value: 'Other' },
];

function UserContext({ onContextSubmit, initialContext }) {
    const { language, t } = useLanguage();
    const [lifestyle, setLifestyle] = useState(initialContext?.lifestyle || '');
    const [location, setLocation] = useState(initialContext?.location || '');
    const [customLocation, setCustomLocation] = useState('');
    const [interests, setInterests] = useState(initialContext?.interests || []);
    const [isExpanded, setIsExpanded] = useState(!initialContext);

    const toggleInterest = (interestId) => {
        setInterests(prev =>
            prev.includes(interestId)
                ? prev.filter(i => i !== interestId)
                : [...prev, interestId]
        );
    };

    const handleSubmit = () => {
        const context = {
            lifestyle,
            location: location === 'Other' ? customLocation : location,
            interests,
        };
        onContextSubmit(context);
        setIsExpanded(false);
    };

    const isValid = lifestyle && (location || customLocation) && interests.length > 0;

    if (!isExpanded && initialContext) {
        return (
            <div className="user-context-summary glass-card" onClick={() => setIsExpanded(true)}>
                <div className="context-preview">
                    <span className="context-icon">👤</span>
                    <div className="context-info">
                        <span className="context-lifestyle">
                            {LIFESTYLE_OPTIONS.find(l => l.id === initialContext.lifestyle)?.icon}
                            {LIFESTYLE_OPTIONS.find(l => l.id === initialContext.lifestyle)?.[language === 'ta' ? 'labelTa' : 'label']}
                        </span>
                        <span className="context-location">📍 {initialContext.location}</span>
                    </div>
                    <button className="btn btn-ghost edit-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                        {language === 'ta' ? 'திருத்து' : 'Edit'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-context-form glass-card animate-fadeIn">
            <header className="form-header">
                <h3>
                    <span className="header-icon">✨</span>
                    {language === 'ta' ? 'உங்களைப் பற்றி சொல்லுங்கள்' : 'Tell us about yourself'}
                </h3>
                <p className="form-subtitle">
                    {language === 'ta'
                        ? 'சிறந்த பரிந்துரைகளுக்கு உங்கள் விருப்பங்களைத் தேர்ந்தெடுக்கவும்'
                        : 'Select your preferences for personalized recommendations'}
                </p>
            </header>

            {/* Lifestyle Selection */}
            <section className="form-section">
                <label className="section-label">
                    {language === 'ta' ? 'நான் ஒரு...' : "I'm a..."}
                </label>
                <div className="option-grid lifestyle-grid">
                    {LIFESTYLE_OPTIONS.map(option => (
                        <button
                            key={option.id}
                            className={`option-btn ${lifestyle === option.id ? 'selected' : ''}`}
                            onClick={() => setLifestyle(option.id)}
                        >
                            <span className="option-icon">{option.icon}</span>
                            <span className="option-label">
                                {language === 'ta' ? option.labelTa : option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Location Selection */}
            <section className="form-section">
                <label className="section-label">
                    {language === 'ta' ? 'எனது இருப்பிடம்' : 'My location'}
                </label>
                <div className="location-grid">
                    {LOCATION_PRESETS.map(loc => (
                        <button
                            key={loc.id}
                            className={`location-btn ${location === loc.value ? 'selected' : ''}`}
                            onClick={() => setLocation(loc.value)}
                        >
                            📍 {loc.label}
                        </button>
                    ))}
                </div>
                {location === 'Other' && (
                    <input
                        type="text"
                        className="input-field custom-location"
                        placeholder={language === 'ta' ? 'உங்கள் நகரத்தை உள்ளிடவும்' : 'Enter your city'}
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                    />
                )}
            </section>

            {/* Interests Selection */}
            <section className="form-section">
                <label className="section-label">
                    {language === 'ta' ? 'எனது ஆர்வங்கள்' : 'My interests'}
                    <span className="hint">({language === 'ta' ? 'பலவற்றைத் தேர்ந்தெடுக்கவும்' : 'select multiple'})</span>
                </label>
                <div className="option-grid interests-grid">
                    {INTEREST_OPTIONS.map(option => (
                        <button
                            key={option.id}
                            className={`option-btn ${interests.includes(option.id) ? 'selected' : ''}`}
                            onClick={() => toggleInterest(option.id)}
                        >
                            <span className="option-icon">{option.icon}</span>
                            <span className="option-label">
                                {language === 'ta' ? option.labelTa : option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Submit Button */}
            <footer className="form-footer">
                <button
                    className="btn btn-primary submit-context-btn"
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    {language === 'ta' ? 'தொடரவும்' : 'Continue with personalization'}
                </button>
            </footer>
        </div>
    );
}

export default UserContext;
