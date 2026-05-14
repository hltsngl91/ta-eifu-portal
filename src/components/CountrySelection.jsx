import React, { useState, useEffect } from 'react';
import ContinentAccordion from './ContinentAccordion';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../contexts/TranslationContext';

const CountrySelection = ({ onSelectCountry }) => {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    translateBatch([
      'Select your country',
      'Please select your country or region to access the appropriate Instructions for Use.',
      'Failed to load regions.',
      'Show countries',
      'Hide countries'
    ]);
  }, [translateBatch]);

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountryData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load countries:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (countryData) {
      translateBatch(Object.keys(countryData), { context: 'country-selection' });
    }
  }, [countryData, translateBatch]);

  return (
    <div className="relative font-sans min-h-screen w-full flex flex-col items-center pb-32">
      
      {/* Top Hero Area - Deep Sapphire Blue Gradient spanning top half */}
      <div className="absolute top-0 left-0 w-full h-[60vh] min-h-[500px] bg-gradient-to-br from-[#1e56ff] via-[#1447d7] to-[#0a2a85] overflow-hidden rounded-b-[60px]" style={{ boxShadow: '0 20px 50px rgba(20,71,215,0.2)' }}>
        {/* Soft light bloom and glass reflections inside hero */}
        <div className="absolute -top-[30%] -right-[10%] w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-[#1e56ff]/30 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 pointer-events-none rounded-b-[60px]" style={{ boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -4px 30px rgba(0,0,0,0.3)' }}></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-8 xl:px-12">
        {/* Top Header with Logo and Language Selector */}
        <header className="w-full max-w-6xl flex items-center justify-between py-10 mb-4">
          <div className="inline-flex items-center group cursor-default hover:-translate-y-0.5 transition-transform duration-500">
            {/* Logo floats naturally on the blue area with a drop shadow */}
            <img 
              src="/a4.png" 
              alt="TA Dental Implants Logo" 
              className="w-[140px] md:w-[180px] h-auto object-contain transition-all duration-500" 
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))' }}
            />
          </div>
          <LanguageSelector />
        </header>

        {/* Hero Title */}
        <div className="w-full max-w-4xl flex flex-col items-center text-center mb-16 mt-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md mb-6">
            {t('Select your country')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-50/90 max-w-3xl leading-relaxed drop-shadow-sm font-light">
            {t('Please select your country or region to access the appropriate Instructions for Use.')}
          </p>
        </div>

        {/* Big Overlapping Panel Container */}
        <div className="country-main-panel w-full max-w-5xl rounded-[40px] p-6 md:p-10 transition-all duration-500 relative">
          {/* Subtle inner reflection */}
          <div className="absolute inset-0 rounded-[40px] pointer-events-none opacity-40" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)' }}></div>
          
          <div className="relative z-10 min-h-[300px]">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="w-12 h-12 border-4 border-[#1447d7]/30 border-t-[#1447d7] rounded-full animate-spin"></div>
              </div>
            ) : countryData ? (
              Object.entries(countryData).map(([region, countries]) => (
                <ContinentAccordion 
                  key={region} 
                  region={region} 
                  countries={countries} 
                  onSelectCountry={onSelectCountry} 
                />
              ))
            ) : (
              <div className="text-center text-slate-500 py-12">{t('Failed to load regions.')}</div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CountrySelection;
