import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const LanguageSelector = () => {
  const { language, setLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel max-w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-full flex items-center gap-2 sm:gap-3 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95"
      >
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-[#1447d7] to-[#1e56ff] flex items-center justify-center text-white shadow-inner">
          <Globe className="w-4.5 h-4.5" />
        </div>
        <span className="text-slate-700 font-bold text-sm tracking-wide truncate">
          {selectedLang.name}
        </span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 max-w-[calc(100vw-2rem)] glass-panel rounded-[24px] py-3 shadow-2xl z-[100] animate-in fade-in zoom-in duration-200 origin-top-right border border-white/40">
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar px-2 space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                  language === lang.code 
                  ? 'bg-[#1447d7] text-white shadow-lg' 
                  : 'hover:bg-white/60 text-slate-600'
                }`}
              >
                <span className="font-semibold text-sm">{lang.name}</span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
