import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const CountryItem = ({ country, onSelect }) => {
  const { t } = useTranslation();
  const isoCode = country.isoCode ? country.isoCode.toLowerCase() : '';
  const flagSrc = isoCode ? `https://flagcdn.com/w160/${isoCode}.png` : '';

  return (
    <button
      onClick={() => onSelect(country)}
      className="country-item-card flex items-center gap-4 py-3.5 px-5 w-full text-left rounded-2xl group outline-none focus:ring-2 focus:ring-[#1447d7]/30"
    >
      {flagSrc ? (
        <div className="flag-badge">
          <img 
            src={flagSrc} 
            alt={`${country.name} flag`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flag-badge flex items-center justify-center bg-slate-100">
          <span className="text-xs text-slate-400">?</span>
        </div>
      )}
      <span className="text-slate-700 font-bold text-lg group-hover:text-[#1447d7] transition-colors">{t(country.name)}</span>
    </button>
  );
};

export default CountryItem;
