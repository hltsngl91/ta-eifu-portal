import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const LABEL_GUIDE_TEXTS = [
  'How to find REF and UDI/GTIN numbers',
  'Implant label',
  'Prosthetic and other components label',
  'Label guide image not found.',
  'Close',
];

const LABEL_GUIDES = [
  {
    title: 'Implant label',
    src: '/label-guides/implants.PNG'
  },
  {
    title: 'Prosthetic and other components label',
    src: '/label-guides/Prosthetic.PNG'
  }
];

const LabelGuideModal = ({ onClose }) => {
  const [missingImages, setMissingImages] = useState({});
  const [previewGuide, setPreviewGuide] = useState(null);
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    translateBatch(LABEL_GUIDE_TEXTS);
  }, [translateBatch]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-[10000] flex items-center justify-center px-4 py-8 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="label-guide-title"
    >
      <div className="about-modal-card relative w-full max-w-5xl overflow-hidden rounded-[36px] border border-white/90 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/80 text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1447d7]/30"
          aria-label={t('Close')}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/85 via-white/25 to-[#1e56ff]/10" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1e56ff]/15 blur-[80px]" />

        <div className="about-modal-scroll relative p-7 md:p-10">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e56ff] via-[#1447d7] to-[#0a2a85] shadow-brand">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>

          <h2 id="label-guide-title" className="pr-12 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {t('How to find REF and UDI/GTIN numbers')}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {LABEL_GUIDES.map((guide) => (
              <figure key={guide.title} className="label-guide-card rounded-[28px] p-4">
                <div className="label-guide-image-frame rounded-[22px] overflow-hidden">
                  {missingImages[guide.src] ? (
                    <div className="flex h-full min-h-[280px] items-center justify-center px-6 text-center text-sm font-extrabold text-slate-400">
                      {t('Label guide image not found.')}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPreviewGuide(guide)}
                      className="block h-full w-full cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-[#1447d7]/25"
                      aria-label={t(guide.title)}
                    >
                      <img
                        src={guide.src}
                        alt={t(guide.title)}
                        className="h-full w-full object-contain"
                        onError={() => setMissingImages((current) => ({ ...current, [guide.src]: true }))}
                      />
                    </button>
                  )}
                </div>
                <figcaption className="mt-4 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500">
                  {t(guide.title)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      {previewGuide && (
        <div
          className="fixed inset-0 z-[10030] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={t(previewGuide.title)}
          onClick={() => setPreviewGuide(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewGuide(null)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/90 text-slate-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label={t('Close')}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="max-h-[86vh] w-full max-w-6xl rounded-[28px] border border-white/30 bg-white/96 p-3 shadow-[0_36px_110px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={previewGuide.src}
              alt={t(previewGuide.title)}
              className="max-h-[78vh] w-full rounded-[20px] object-contain"
            />
            <p className="px-3 pt-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500">
              {t(previewGuide.title)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelGuideModal;
