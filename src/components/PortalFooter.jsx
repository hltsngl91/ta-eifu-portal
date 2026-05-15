import React, { useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const FOOTER_TEXTS = [
  'All rights reserved.',
  'Electronic Instructions for Use (eIFU) Portal',
  'Made in Germany',
];

const PortalFooter = () => {
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    translateBatch(FOOTER_TEXTS);
  }, [translateBatch]);

  return (
    <footer className="portal-footer relative z-10 px-4 py-8 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1">
        <p className="text-sm font-semibold tracking-wide text-slate-500/90">
          © 2026 TA Dental Implants. {t('All rights reserved.')}
        </p>
        <p className="text-xs font-medium tracking-[0.16em] text-slate-400 uppercase">
          {t('Electronic Instructions for Use (eIFU) Portal')}
        </p>
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400/80 uppercase">
          {t('Made in Germany')}
        </p>
      </div>
    </footer>
  );
};

export default PortalFooter;
