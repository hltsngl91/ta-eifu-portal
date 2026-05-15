import React, { useState } from 'react';
import CountrySelection from './components/CountrySelection';
import EifuPortal from './components/EifuPortal';
import ProfessionalAgreementModal from './components/ProfessionalAgreementModal';
import PortalFooter from './components/PortalFooter';
import { TranslationProvider } from './contexts/TranslationContext';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCandidate, setSelectedCountryCandidate] = useState(null);

  const handleAgreeProfessionalTerms = () => {
    setSelectedCountry(selectedCountryCandidate);
    setSelectedCountryCandidate(null);
  };

  const handleCancelProfessionalTerms = () => {
    setSelectedCountryCandidate(null);
  };

  return (
    <TranslationProvider>
      <div className="min-h-screen relative font-sans overflow-hidden">
        {/* Abstract Background Ambient Lights shared across entire app */}
        <div className="ambient-blob ambient-blob-1"></div>
        <div className="ambient-blob ambient-blob-2"></div>
        <div className="ambient-blob ambient-blob-3"></div>

        {selectedCountry ? (
          <EifuPortal 
            selectedCountry={selectedCountry} 
            onChangeCountry={() => setSelectedCountry(null)} 
          />
        ) : (
          <>
            <CountrySelection onSelectCountry={(country) => setSelectedCountryCandidate(country)} />
            <ProfessionalAgreementModal
              isOpen={Boolean(selectedCountryCandidate)}
              onAgree={handleAgreeProfessionalTerms}
              onCancel={handleCancelProfessionalTerms}
            />
          </>
        )}
        <PortalFooter />
      </div>
    </TranslationProvider>
  );
}

export default App;
