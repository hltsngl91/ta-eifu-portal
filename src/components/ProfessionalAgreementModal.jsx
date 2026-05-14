import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import TermsOfUseModal from './TermsOfUseModal';

const AGREEMENT_TEXTS = [
  'Instructions for Use (IFUs)',
  'This site is intended for dental professionals only. Please be aware that the content of the instructions for use can vary based on the regulatory requirements in your country.',
  'I hereby confirm that I am a dental professional and I accept the terms and conditions for the use of this site.',
  'I hereby confirm that I am a dental professional and I accept the',
  'terms and conditions',
  'for the use of this site.',
  'Agree',
  'Cancel',
];

const ProfessionalAgreementModal = ({ isOpen, onAgree, onCancel }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setIsTermsModalOpen(false);
      translateBatch(AGREEMENT_TEXTS);
    }
  }, [isOpen, translateBatch]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (isTermsModalOpen) {
        setIsTermsModalOpen(false);
        return;
      }
      onCancel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isTermsModalOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-8 animate-in fade-in duration-300"
      style={{
        background: 'rgba(15, 23, 42, 0.35)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="professional-agreement-title"
    >
      <div className="relative w-full max-w-3xl rounded-[36px] border border-white/80 bg-white/90 p-7 shadow-[0_36px_110px_rgba(15,23,42,0.28),0_16px_40px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-3xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 md:p-10">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/75 text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1447d7]/30"
          aria-label={t('Cancel')}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/80 via-white/20 to-[#1e56ff]/10" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#1e56ff]/15 blur-[70px]" />

        <div className="relative">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e56ff] via-[#1447d7] to-[#0a2a85] shadow-brand">
            <Check className="h-8 w-8 text-white" />
          </div>

          <h2
            id="professional-agreement-title"
            className="pr-12 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
          >
            {t('Instructions for Use (IFUs)')}
          </h2>

          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 md:text-lg">
            {t('This site is intended for dental professionals only. Please be aware that the content of the instructions for use can vary based on the regulatory requirements in your country.')}
          </p>

          <div
            className="mt-8 flex cursor-pointer items-start gap-4 rounded-[24px] border border-white/80 bg-white/72 p-5 shadow-glass transition-all duration-300 hover:bg-white/90"
            role="checkbox"
            aria-checked={isConfirmed}
            tabIndex={0}
            onClick={() => setIsConfirmed((current) => !current)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsConfirmed((current) => !current);
              }
            }}
          >
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(event) => setIsConfirmed(event.target.checked)}
              tabIndex={-1}
              aria-hidden="true"
              className="peer sr-only"
            />
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-white shadow-inner-glow transition-all duration-300 peer-checked:border-[#1447d7] peer-checked:bg-[#1447d7] peer-focus:ring-4 peer-focus:ring-[#1447d7]/20">
              <Check className={`h-4 w-4 transition-opacity ${isConfirmed ? 'opacity-100' : 'opacity-0'}`} />
            </span>
            <span className="text-sm font-semibold leading-6 text-slate-700 md:text-base">
              {t('I hereby confirm that I am a dental professional and I accept the')}{' '}
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsTermsModalOpen(true);
                }}
                className="inline font-extrabold text-[#1447d7] underline decoration-[#1447d7]/30 underline-offset-4 transition-colors hover:text-[#0f3fb8] hover:decoration-[#0f3fb8]/60 focus:outline-none focus:ring-2 focus:ring-[#1447d7]/25 rounded"
              >
                {t('terms and conditions')}
              </button>{' '}
              {t('for the use of this site.')}
            </span>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-[20px] border border-white/90 bg-white/75 px-7 py-4 text-sm font-extrabold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1447d7]/25"
            >
              {t('Cancel')}
            </button>
            <button
              type="button"
              onClick={onAgree}
              disabled={!isConfirmed}
              className="rounded-[20px] border border-white/20 bg-gradient-to-br from-[#1e56ff] via-[#1447d7] to-[#0f3fb8] px-9 py-4 text-sm font-extrabold text-white shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand-hover focus:outline-none focus:ring-4 focus:ring-[#1447d7]/25 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-brand"
            >
              {t('Agree')}
            </button>
          </div>
        </div>
      </div>
      {isTermsModalOpen && <TermsOfUseModal onClose={() => setIsTermsModalOpen(false)} />}
    </div>
  );
};

export default ProfessionalAgreementModal;
