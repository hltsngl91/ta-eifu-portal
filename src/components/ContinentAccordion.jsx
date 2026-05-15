import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CountryItem from './CountryItem';
import { useTranslation } from '../contexts/TranslationContext';

const ContinentAccordion = ({ region, countries, onSelectCountry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      translateBatch(
        [region, ...countries.map((country) => country.name)],
        { context: 'country-selection' }
      );
    }
  }, [countries, isOpen, region, translateBatch]);

  return (
    <div className="continent-row-card rounded-[32px] overflow-hidden mb-6 group cursor-pointer">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="continent-header w-full px-8 py-6 flex items-center justify-between transition-colors outline-none"
      >
        <h3 className="continent-title text-2xl font-extrabold text-slate-800 drop-shadow-sm">{t(region)}</h3>
        <div 
          className="continent-toggle flex items-center gap-3 text-[#1447d7] font-bold px-5 py-2.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 4px 10px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 1)'
          }}
        >
          {isOpen ? t('Hide countries') : t('Show countries')}
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      
      <div 
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-8 pb-8 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isOpen && countries.map((country, idx) => (
            <CountryItem key={idx} country={country} onSelect={onSelectCountry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinentAccordion;
