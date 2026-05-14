import React, { useEffect } from 'react';
import { ExternalLink, ScrollText, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const TERMS_SECTIONS = [
  {
    paragraphs: [
      'Please read these Terms of Use carefully before using this eIFU portal. By accessing or using this portal, you confirm that you are a dental professional or authorized user and that you accept these Terms. If you do not accept these Terms, you must not use this portal.'
    ]
  },
  {
    title: 'Use of this portal',
    paragraphs: [
      'This portal provides access to electronic Instructions for Use (eIFUs), archived IFU versions, and related product documentation for TA Dental Implants products.',
      'You may view, download, or print the materials available through this portal solely for professional, clinical, regulatory, or product documentation purposes. You must not modify, reproduce, distribute, publish, sell, or use the materials for any unauthorized commercial purpose.',
      'The TA Dental Implants name, logo, product names, documents, graphics, and related materials are protected by intellectual property rights. Unauthorized use of these materials may violate applicable laws.'
    ]
  },
  {
    title: 'Product information and regional availability',
    paragraphs: [
      'The availability, indications, contraindications, warnings, precautions, and content of IFUs may vary depending on local regulatory requirements, product approvals, and market availability.',
      'Information published on this portal may refer to products, components, or services that are not available or approved in every country. Users are responsible for ensuring that the products and documents used are appropriate and valid for their jurisdiction.'
    ]
  },
  {
    title: 'Current IFU versions',
    paragraphs: [
      'TA Dental Implants strongly recommends that users consult this portal regularly to obtain the latest valid version of the Instructions for Use.',
      'Previous IFU versions may be available in the IFU Archive for historical and traceability purposes only. Superseded or archived IFUs should not be used as the current valid instructions unless specifically required for historical documentation.',
      'No separate notification may be sent when an IFU is updated, revised, or replaced.'
    ]
  },
  {
    title: 'PDF documents',
    paragraphs: [
      'To view or print PDF documents, compatible PDF viewing software is required. Adobe Acrobat Reader can be downloaded free of charge from:'
    ],
    link: 'https://get.adobe.com/reader/'
  },
  {
    title: 'Printed copies',
    paragraphs: [
      'Where applicable and in accordance with local regulatory requirements, printed copies of IFUs may be requested. For assistance regarding printed IFUs or product documentation, please contact TA Dental Implants or your authorized local distributor.'
    ]
  },
  {
    title: 'Third-party links',
    paragraphs: [
      'This portal may contain links or references to third-party websites or external resources. Such links are provided for convenience only. TA Dental Implants does not control and is not responsible for the content, accuracy, availability, or security of external websites or third-party resources.'
    ]
  },
  {
    title: 'Disclaimer',
    paragraphs: [
      'The materials on this portal are provided for professional information and product documentation purposes. While TA Dental Implants aims to keep the information accurate and up to date, the portal and its contents are provided without any warranty of uninterrupted availability, error-free operation, or suitability for a particular purpose, except where such warranties cannot be excluded under applicable law.'
    ]
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by applicable law, TA Dental Implants, its affiliates, representatives, distributors, officers, employees, or partners shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from the use of, inability to use, or reliance on this portal, its documents, or any linked external resources.'
    ]
  },
  {
    title: 'User responsibility',
    paragraphs: [
      'Users are responsible for reading and following the applicable IFU before using any product. Users must also comply with all local laws, professional standards, clinical protocols, and regulatory requirements applicable in their country.'
    ]
  },
  {
    title: 'Data privacy',
    paragraphs: [
      'Any personal data submitted through this portal, if any, shall be handled in accordance with applicable data protection laws and the relevant privacy policy of TA Dental Implants.'
    ]
  },
  {
    title: 'Changes to these Terms',
    paragraphs: [
      'TA Dental Implants may update or revise these Terms of Use at any time. Users should review the current Terms periodically. Continued use of this portal after updates means that the revised Terms are accepted.'
    ]
  },
  {
    title: 'Entire agreement',
    paragraphs: [
      'These Terms of Use constitute the terms governing access to and use of this eIFU portal. If any provision is found to be invalid or unenforceable, the remaining provisions shall remain valid and enforceable.',
      'Last revised: 2026'
    ]
  }
];

const TERMS_TEXTS = [
  'Terms of Use',
  'Close',
  ...TERMS_SECTIONS.flatMap((section) => [
    section.title,
    ...section.paragraphs
  ]).filter(Boolean)
];

const TermsOfUseModal = ({ onClose }) => {
  const { t, translateBatch } = useTranslation();

  useEffect(() => {
    translateBatch(TERMS_TEXTS);
  }, [translateBatch]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-[10020] flex items-center justify-center px-4 py-8 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-of-use-title"
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
            <ScrollText className="h-8 w-8 text-white" />
          </div>

          <h2 id="terms-of-use-title" className="pr-12 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {t('Terms of Use')}
          </h2>

          <div className="mt-7 space-y-7 text-[15px] font-medium leading-7 text-slate-800 md:text-base">
            {TERMS_SECTIONS.map((section, sectionIndex) => (
              <section key={section.title || sectionIndex} className="space-y-3">
                {section.title && (
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                    {t(section.title)}
                  </h3>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {t(paragraph)}
                    {section.link && (
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 inline-flex items-center gap-1 font-extrabold text-[#1447d7] hover:text-[#0f3fb8]"
                      >
                        {section.link}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;
