import React, { useEffect } from 'react';
import { ExternalLink, Info, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const RefBadge = () => <span className="ref-symbol">REF</span>;

const ABOUT_TEXTS = [
  'About this section',
  'This portal provides access to the current electronic Instructions for Use (eIFUs) and related product documentation for TA Dental Implants products.',
  'You can search for IFUs by entering the article number',
  'product name, UDI/GTIN, or IFU number into the search field.',
  'The article number',
  'and UDI/GTIN information can be found on the product label, packaging, and accompanying delivery documentation.',
  'Search results will display the corresponding IFU documents available for the selected product.',
  'Documents may be viewed online or downloaded as PDF files for printing and offline viewing.',
  'The IFUs are available in multiple languages.',
  'Please select your preferred language using the language selector available within the portal interface.',
  'To view or print PDF documents, compatible PDF viewing software is required.',
  'You may download Adobe Acrobat Reader free of charge from the following website:',
  'Previous IFU versions that have been replaced, updated, or are no longer valid may still be available within the IFU Archive section for historical and traceability purposes.',
  'Please note that users may not receive separate notifications when an IFU is updated, revised, or replaced by a newer version.',
  'TA Dental Implants strongly recommends consulting this portal regularly to ensure access to the latest valid version of the Instructions for Use.',
  'Printed copies of IFUs may be requested where applicable and in accordance with local regulatory requirements.',
  'For assistance regarding printed IFUs, product documentation, or regulatory information, please contact TA Dental Implants or your authorized local distributor.',
  'TA Dental Implants may provide links or references to third-party resources or external websites for user convenience.',
  'TA Dental Implants is not responsible for the content, accuracy, or availability of external resources not directly controlled by the company.',
  'This portal is intended for use by dental professionals and authorized personnel only.',
  'The availability and content of IFUs may vary depending on regional regulatory requirements and market approvals.',
  'Close',
];

const AboutModal = ({ onClose }) => {
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    translateBatch(ABOUT_TEXTS);
  }, [translateBatch]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-[10000] flex items-center justify-center px-4 py-8 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="about-modal-card relative w-full max-w-4xl overflow-hidden rounded-[36px] border border-white/90 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
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
            <Info className="h-8 w-8 text-white" />
          </div>

          <h2 id="about-modal-title" className="pr-12 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {t('About this section')}
          </h2>

          <div className="mt-7 space-y-5 text-[15px] font-medium leading-7 text-slate-800 md:text-base">
            <p>
              {t('This portal provides access to the current electronic Instructions for Use (eIFUs) and related product documentation for TA Dental Implants products.')}
            </p>

            <p>
              {t('You can search for IFUs by entering the article number')} <RefBadge />, {t('product name, UDI/GTIN, or IFU number into the search field.')} {t('The article number')} <RefBadge /> {t('and UDI/GTIN information can be found on the product label, packaging, and accompanying delivery documentation.')}
            </p>

            <p>
              {t('Search results will display the corresponding IFU documents available for the selected product.')} {t('Documents may be viewed online or downloaded as PDF files for printing and offline viewing.')}
            </p>

            <p>
              {t('The IFUs are available in multiple languages.')} {t('Please select your preferred language using the language selector available within the portal interface.')}
            </p>

            <p>
              {t('To view or print PDF documents, compatible PDF viewing software is required.')} {t('You may download Adobe Acrobat Reader free of charge from the following website:')}
              <a
                href="https://get.adobe.com/reader/"
                target="_blank"
                rel="noreferrer"
                className="ml-1 inline-flex items-center gap-1 font-extrabold text-[#1447d7] hover:text-[#0f3fb8]"
              >
                https://get.adobe.com/reader/
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>

            <p>
              {t('Previous IFU versions that have been replaced, updated, or are no longer valid may still be available within the IFU Archive section for historical and traceability purposes.')}
            </p>

            <p>
              {t('Please note that users may not receive separate notifications when an IFU is updated, revised, or replaced by a newer version.')} {t('TA Dental Implants strongly recommends consulting this portal regularly to ensure access to the latest valid version of the Instructions for Use.')}
            </p>

            <p>
              {t('Printed copies of IFUs may be requested where applicable and in accordance with local regulatory requirements.')} {t('For assistance regarding printed IFUs, product documentation, or regulatory information, please contact TA Dental Implants or your authorized local distributor.')}
            </p>

            <p>
              {t('TA Dental Implants may provide links or references to third-party resources or external websites for user convenience.')} {t('TA Dental Implants is not responsible for the content, accuracy, or availability of external resources not directly controlled by the company.')}
            </p>

            <p>
              {t('This portal is intended for use by dental professionals and authorized personnel only.')} {t('The availability and content of IFUs may vary depending on regional regulatory requirements and market approvals.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
