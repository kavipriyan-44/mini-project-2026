import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import CardInput from './components/CardInput';
import UserContext from './components/UserContext';
import BenefitsDashboard from './components/BenefitsDashboard';
import Recommendations from './components/Recommendations';
import './index.css';
import './App.css';

function App() {
  const [cardInfo, setCardInfo] = useState(null);
  const [userContext, setUserContext] = useState(null);

  const handleCardValidated = (result) => {
    setCardInfo(result);
  };

  const handleContextSubmit = (context) => {
    setUserContext(context);
  };

  const handleReset = () => {
    setCardInfo(null);
    setUserContext(null);
  };

  return (
    <LanguageProvider>
      <div className="app">
        <Header />

        <main className="main-content container">
          {!cardInfo ? (
            <CardInput onCardValidated={handleCardValidated} />
          ) : (
            <div className="dashboard-container animate-fadeIn">
              <button className="btn btn-ghost back-btn" onClick={handleReset}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Try another card
              </button>

              {/* User Context Collection */}
              <UserContext
                onContextSubmit={handleContextSubmit}
                initialContext={userContext}
              />

              <BenefitsDashboard cardInfo={cardInfo} />

              {/* Only show recommendations after user context is provided */}
              <Recommendations cardInfo={cardInfo} userContext={userContext} />
            </div>
          )}
        </main>

        <footer className="app-footer">
          <div className="container">
            <p className="disclaimer">
              ⚠️ This is a demo application. No real card data is stored or processed.
            </p>
            <p className="powered-by">
              Powered by <span className="visa-text">Visa</span> Developer APIs & <span className="ai-text">Llama AI</span>
            </p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;
