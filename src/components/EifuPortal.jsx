import React, { useState, useEffect } from 'react';
import { Search, Archive, FileText, CheckCircle2, ChevronDown, Download, Info, Globe, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import AboutModal from './AboutModal';
import LabelGuideModal from './LabelGuideModal';
import { useTranslation } from '../contexts/TranslationContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const extractRefFromUdi = (value = '') => {
  const source = String(value).trim();
  const match = source.match(/\+EAMG([A-Z0-9]+?)1\/\$/i)
    || source.match(/\+EAMG([A-Z0-9]+?)1\//i)
    || source.match(/\+EAMG([A-Z0-9]{6,10})/i);

  if (!match) return null;

  const ref = match[1].toUpperCase();
  return /[A-Z]1$/.test(ref) ? ref.slice(0, -1) : ref;
};

const EifuPortal = ({ onChangeCountry, selectedCountry }) => {
  const [activeTab, setActiveTab] = useState('Search IFU');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isLabelGuideModalOpen, setIsLabelGuideModalOpen] = useState(false);
  const { language, t, translateBatch } = useTranslation();
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('default');
  const [selectedSubcategory, setSelectedSubcategory] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState('default');

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchingProducts, setIsSearchingProducts] = useState(false);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [isSearchSelectionLocked, setIsSearchSelectionLocked] = useState(false);
  const [ifuDocuments, setIfuDocuments] = useState([]);
  const [isLoadingIfuDocuments, setIsLoadingIfuDocuments] = useState(false);
  const [archiveDocuments, setArchiveDocuments] = useState([]);
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);

  const selectedCountryName = typeof selectedCountry === 'string' ? selectedCountry : selectedCountry?.name;
  const selectedCountryCode = typeof selectedCountry === 'string' ? '' : selectedCountry?.isoCode;

  useEffect(() => {
    translateBatch([
      'Search IFU',
      'IFU Archive',
      'About',
      'Instructions for Use',
      'IFU Search Portal',
      'Search and access the latest Instructions for Use documents for TA Dental Implants.',
      'Search by REF or product name',
      'Search by REF, UDI/GTIN or product name',
      'Where can I find the',
      'and',
      'numbers on the product label?',
      'Where can I find the REF and UDI/GTIN numbers on the product label?',
      'How to find REF and UDI/GTIN numbers',
      'Implant label',
      'Prosthetic and other components label',
      'Search',
      'Category',
      'Subcategory',
      'Product',
      'Available IFU Documents',
      'Clear Filters',
      'Selected Product',
      'Documents',
      'Latest revision',
      'View PDF',
      'Download PDF',
      'View IFU',
      'Please select a product to view available IFU documents.',
      'No IFU documents are available for this product and country.',
      'Archived IFU Documents',
      'Superseded and historical Instructions for Use documents are listed here for traceability.',
      'Archived',
      'Superseded',
      'Language',
      'Archive Year',
      'No archived IFU documents are available.',
      'Change country',
      'All Categories',
      'All Subcategories',
      'No Subcategories',
      'All Products',
      'No products found.',
      'Searching...',
      'Showing first 8 results',
      'Historical Instructions for Use documents and past revisions will be displayed here.'
    ]);
  }, [translateBatch]);

  // Fetch categories on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  useEffect(() => {
    setSubcategories([]);
    setSelectedSubcategory('default');

    if (selectedCategory === 'default') {
      return;
    }

    const params = new URLSearchParams();
    params.append('category', selectedCategory);
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/products/subcategories?${params.toString()}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setSubcategories(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Failed to load subcategories:', err);
          setSubcategories([]);
        }
      });

    return () => controller.abort();
  }, [selectedCategory]);

  // Fetch products based on filters
  useEffect(() => {
    setIsLoadingProducts(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'default') params.append('category', selectedCategory);
    if (selectedSubcategory !== 'default') params.append('subcategory', selectedSubcategory);
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/products?${params.toString()}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        const nextProducts = Array.isArray(data) ? data : [];
        setProducts(nextProducts);
        setSelectedProduct((currentProduct) => {
          if (currentProduct !== 'default' && !nextProducts.some(product => product.Id.toString() === currentProduct)) return 'default';
          return currentProduct;
        });
        setIsLoadingProducts(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Failed to load products:', err);
          setIsLoadingProducts(false);
        }
      });

    return () => controller.abort();
  }, [selectedCategory, selectedSubcategory]);

  const filteredProductsDropdown = products.filter((product) => {
    const categoryMatches = selectedCategory === 'default' || product.Group === selectedCategory;
    const subcategoryMatches = selectedSubcategory === 'default' || product.Subcategory === selectedSubcategory;
    return categoryMatches && subcategoryMatches;
  });
  const visibleSearchResults = searchResults.slice(0, 8);
  const hasMoreSearchResults = searchResults.length > visibleSearchResults.length;
  const showAutocompletePanel = isAutocompleteOpen && searchQuery.trim().length >= 2;
  const noProductsFound = showAutocompletePanel && !isSearchingProducts && searchResults.length === 0;
  const hasSubcategories = subcategories.length > 0;
  const selectedProductObject = products.find((product) => product.Id.toString() === selectedProduct);
  const searchPlaceholder = language === 'tr'
    ? 'Ref, UDI/GTIN veya ürün adına göre ara'
    : t('Search by REF, UDI/GTIN or product name');

  useEffect(() => {
    const normalizedSearch = searchQuery.trim();
    const extractedRef = extractRefFromUdi(normalizedSearch);
    const effectiveSearch = extractedRef || normalizedSearch;

    if (isSearchSelectionLocked) {
      setIsSearchingProducts(false);
      return undefined;
    }

    if (normalizedSearch.length < 2) {
      setSearchResults([]);
      setIsSearchingProducts(false);
      setIsAutocompleteOpen(false);
      return undefined;
    }

    setIsAutocompleteOpen(true);
    setIsSearchingProducts(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams({ search: effectiveSearch });
      if (selectedCategory !== 'default') params.append('category', selectedCategory);
      if (selectedSubcategory !== 'default') params.append('subcategory', selectedSubcategory);
      const liveSearchUrl = `${API_BASE_URL}/api/products?${params.toString()}`;

      fetch(liveSearchUrl, { signal: controller.signal })
        .then(res => res.json())
        .then(data => {
          const nextResults = Array.isArray(data) ? data : [];
          const exactRefMatch = nextResults.length === 1
            && nextResults[0].Ref?.toLowerCase() === effectiveSearch.toLowerCase();

          if ((extractedRef || exactRefMatch) && nextResults.length === 1) {
            const product = nextResults[0];
            setSelectedProduct(product.Id.toString());
            setIsSearchSelectionLocked(true);
            setSearchQuery(`${product.Ref} - ${product.Name}`);
            setAppliedSearchQuery('');
            setSearchResults([]);
            setIsAutocompleteOpen(false);
            setIsSearchingProducts(false);
            return;
          }
          setSearchResults(nextResults);
          setIsSearchingProducts(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Product autocomplete failed:', err);
            setSearchResults([]);
            setIsSearchingProducts(false);
          }
        });
    }, 280);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [isSearchSelectionLocked, searchQuery, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    if (!selectedProductObject) {
      setIfuDocuments([]);
      setIsLoadingIfuDocuments(false);
      return undefined;
    }

    setIsLoadingIfuDocuments(true);
    const params = new URLSearchParams({ productRef: selectedProductObject.Ref });
    if (selectedCountryCode) params.append('countryCode', selectedCountryCode);
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/ifu/documents?${params.toString()}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setIfuDocuments(Array.isArray(data.documents) ? data.documents : []);
        setIsLoadingIfuDocuments(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Failed to load IFU documents:', err);
          setIfuDocuments([]);
          setIsLoadingIfuDocuments(false);
        }
      });

    return () => controller.abort();
  }, [selectedCountryCode, selectedProductObject]);

  useEffect(() => {
    if (activeTab !== 'IFU Archive' || archiveDocuments.length > 0) {
      return undefined;
    }

    setIsLoadingArchive(true);
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/ifu/archive`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setArchiveDocuments(Array.isArray(data.documents) ? data.documents : []);
        setIsLoadingArchive(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Failed to load IFU archive:', err);
          setArchiveDocuments([]);
          setIsLoadingArchive(false);
        }
      });

    return () => controller.abort();
  }, [activeTab, archiveDocuments.length]);

  const selectProduct = (product) => {
    setSelectedProduct(product.Id.toString());
    setIsSearchSelectionLocked(true);
    setSearchQuery(`${product.Ref} - ${product.Name}`);
    setAppliedSearchQuery('');
    setSearchResults([]);
    setIsAutocompleteOpen(false);
  };

  const applySearch = () => {
    if (searchResults.length > 0) {
      selectProduct(searchResults[0]);
    } else if (searchQuery.trim().length >= 2) {
      setIsAutocompleteOpen(true);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setAppliedSearchQuery('');
    setSelectedCategory('default');
    setSelectedSubcategory('default');
    setSelectedProduct('default');
    setSearchResults([]);
    setIsAutocompleteOpen(false);
    setIsSearchSelectionLocked(false);
  };

  const hasActiveFilters = appliedSearchQuery !== '' || selectedCategory !== 'default' || selectedSubcategory !== 'default' || selectedProduct !== 'default';

  return (
    <div className="relative z-10 flex flex-col min-h-screen container mx-auto px-4 md:px-8 xl:px-12">
        
      {/* Top Header with Naturally Floating Logo and Change Country */}
      <header className="w-full py-8 flex items-center justify-between">
        <div className="inline-flex items-center group cursor-pointer hover:-translate-y-0.5 transition-transform duration-500">
          <div
            className="portal-logo-sapphire w-[140px] md:w-[180px] transition-all duration-500"
            role="img"
            aria-label="TA Dental Implants Logo"
          />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <button 
            onClick={onChangeCountry}
            className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <Globe className="w-5 h-5 text-slate-500 group-hover:text-[#1447d7] transition-colors" />
            <span className="text-slate-600 font-semibold group-hover:text-slate-800 transition-colors hidden sm:inline">
              {selectedCountryName} ({t('Change country')})
            </span>
            <span className="text-slate-600 font-semibold group-hover:text-slate-800 transition-colors sm:hidden">
              {t('Change country')}
            </span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-grow flex flex-col lg:flex-row gap-10 lg:gap-14 pb-20 mt-10 md:mt-12">
        
        {/* Futuristic Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="glass-panel rounded-[32px] p-8 sticky top-10">
            <nav className="space-y-10">
              
              {/* About Section */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsAboutModalOpen(true)}
                  className="nav-item group w-full text-left"
                >
                  <Info className="w-6 h-6 text-slate-400 group-hover:text-[#1447d7] transition-colors" />
                  <span className="text-lg">{t('About')}</span>
                </button>
              </div>

              {/* Instructions for Use Section */}
              <div>
                <div className="px-6 py-2 text-[13px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-4">{t('Instructions for Use')}</div>
                <div className="space-y-3">
                  
                  <div 
                    className={`nav-item ${activeTab === 'Search IFU' ? 'active' : 'group'}`}
                    onClick={() => setActiveTab('Search IFU')}
                  >
                    <div className="flex items-center gap-4 relative z-10 w-full justify-between">
                      <div className="flex items-center gap-4">
                        <Search className={`w-6 h-6 transition-colors ${activeTab === 'Search IFU' ? 'text-white drop-shadow-md' : 'text-slate-400 group-hover:text-[#1447d7]'}`} />
                        <span className={`text-lg transition-colors ${activeTab === 'Search IFU' ? 'font-bold' : ''}`}>{t('Search IFU')}</span>
                      </div>
                      {activeTab === 'Search IFU' && (
                        <div className="w-2 h-8 bg-white/90 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"></div>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className={`nav-item ${activeTab === 'IFU Archive' ? 'active' : 'group'}`}
                    onClick={() => setActiveTab('IFU Archive')}
                  >
                    <div className="flex items-center gap-4 relative z-10 w-full justify-between">
                      <div className="flex items-center gap-4">
                        <Archive className={`w-6 h-6 transition-colors ${activeTab === 'IFU Archive' ? 'text-white drop-shadow-md' : 'text-slate-400 group-hover:text-[#1447d7]'}`} />
                        <span className={`text-lg transition-colors ${activeTab === 'IFU Archive' ? 'font-bold' : ''}`}>{t('IFU Archive')}</span>
                      </div>
                      {activeTab === 'IFU Archive' && (
                        <div className="w-2 h-8 bg-white/90 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"></div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col min-w-0">
          {activeTab === 'Search IFU' ? (
            <>
              {/* Cinematic Hero Card */}
              <div className="hero-card relative rounded-[40px] p-10 md:p-16 overflow-hidden shadow-brand-hover border border-white/10 group">
                {/* Rich sapphire gradient base */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e56ff] via-[#1447d7] to-[#0a2a85] opacity-95"></div>
                
                {/* Edge lighting / inner glow */}
                <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-[40px]"></div>
                
                {/* Subtle glossy reflections and light bloom */}
                <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[80px] pointer-events-none group-hover:opacity-80 transition-opacity duration-1000 mix-blend-overlay"></div>
                <div className="absolute -bottom-[40%] -left-[10%] w-[600px] h-[600px] bg-[#1e56ff]/20 rounded-full blur-[60px] pointer-events-none mix-blend-screen"></div>
                
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
                    {t('IFU Search Portal')}
                  </h1>
                  <p className="text-blue-50/90 text-xl md:text-2xl max-w-3xl font-light leading-relaxed drop-shadow-sm">
                    {t('Search and access the latest Instructions for Use documents for TA Dental Implants.')}
                  </p>
                </div>
              </div>

              {/* Neumorphic Search Bar Area */}
              <div className="hero-search -mt-10 mx-6 sm:mx-12 relative z-20">
                <div className="relative">
                  <div className="search-glass glass-panel relative rounded-[32px] p-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="search-wrapper neu-input-wrapper w-full md:flex-grow">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#1447d7]/70" />
                      <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="search-input neu-input"
                        value={searchQuery}
                        onChange={(e) => {
                          const nextValue = e.target.value;
                          setIsSearchSelectionLocked(false);
                          setSearchQuery(nextValue);
                          if (nextValue.trim() === '') {
                            setAppliedSearchQuery('');
                            setSelectedProduct('default');
                            setSearchResults([]);
                            setIsAutocompleteOpen(false);
                          }
                        }}
                        onFocus={() => {
                          if (searchQuery.trim().length >= 2) {
                            setIsAutocompleteOpen(true);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            applySearch();
                          }
                          if (e.key === 'Escape') {
                            setIsAutocompleteOpen(false);
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={applySearch}
                      className="search-button neu-btn-primary px-10 py-5 w-full md:w-auto text-lg flex items-center justify-center gap-3 flex-shrink-0"
                    >
                      <span>{t('Search')}</span>
                    </button>
                  </div>
                  {showAutocompletePanel && (
                    <div className="autocomplete-panel absolute left-0 right-0 top-[calc(100%+12px)] z-[9999] rounded-[28px] border border-white/90 p-3">
                      {isSearchingProducts ? (
                        <div className="px-4 py-5 text-sm font-semibold text-slate-500">
                          {t('Searching...')}
                        </div>
                      ) : noProductsFound ? (
                        <div className="px-4 py-5 text-sm font-semibold text-slate-500">
                          {t('No products found.')}
                        </div>
                      ) : (
                        <div className="autocomplete-results-scroll pr-1">
                          {visibleSearchResults.map((product) => (
                            <button
                              key={product.Id}
                              type="button"
                              onClick={() => selectProduct(product)}
                              className="autocomplete-result-row w-full rounded-2xl px-4 py-3 text-left transition-all duration-200 focus:outline-none"
                            >
                              <div className="min-w-0">
                                <div className="text-sm font-extrabold text-[#1447d7]">
                                  {product.Ref} - {product.Name}
                                </div>
                                <div className="mt-1 text-xs font-semibold text-slate-500">
                                  {[product.Group, product.Platform].filter(Boolean).join(' | ')}
                                </div>
                              </div>
                            </button>
                          ))}
                          {hasMoreSearchResults && (
                            <div className="px-4 py-3 text-xs font-bold text-slate-400">
                              {t('Showing first 8 results')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsLabelGuideModalOpen(true)}
                  className="label-help-link mt-3 inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full px-4 py-2 text-left text-xs font-extrabold text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#1447d7] focus:outline-none focus:ring-2 focus:ring-[#1447d7]/25"
                  aria-label={t('Where can I find the REF and UDI/GTIN numbers on the product label?')}
                >
                  {language === 'tr' ? (
                    <>
                      <span>Ürün etiketi üzerinde</span>
                      <span className="mini-ref-badge">REF</span>
                      <span>ve</span>
                      <span className="mini-ref-badge">UDI/GTIN</span>
                      <span>numaralarını nerede bulabilirim?</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Where can I find the')}</span>
                      <span className="mini-ref-badge">REF</span>
                      <span>{t('and')}</span>
                      <span className="mini-ref-badge">UDI/GTIN</span>
                      <span>{t('numbers on the product label?')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Neumorphic Filter Pills */}
              <div className="flex flex-col md:flex-row flex-wrap gap-6 mt-12 px-6 sm:px-12">
                <div className="relative w-full md:flex-1 min-w-[220px] group">
                  <select 
                    className="neu-select" 
                    value={selectedCategory}
                    title={selectedCategory === 'default' ? t('Category') : selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory('default');
                      setSelectedProduct('default');
                    }}
                  >
                    <option value="default" disabled hidden>{t('Category')}</option>
                    <option value="default" className="text-slate-400">{t('All Categories')}</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat} title={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-hover:text-[#1447d7] transition-colors pointer-events-none" />
                </div>
                <div className="relative w-full md:flex-1 min-w-[220px] group">
                  <select
                    className="neu-select"
                    value={selectedSubcategory}
                    disabled={!hasSubcategories}
                    title={selectedSubcategory === 'default' ? t('Subcategory') : selectedSubcategory}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      setSelectedProduct('default');
                    }}
                  >
                    <option value="default" disabled hidden>{t('Subcategory')}</option>
                    <option value="default" className="text-slate-400">
                      {hasSubcategories ? t('All Subcategories') : t('No Subcategories')}
                    </option>
                    {subcategories.map((subcat, idx) => (
                      <option key={idx} value={subcat} title={subcat}>{subcat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-hover:text-[#1447d7] transition-colors pointer-events-none" />
                </div>
                <div className="relative w-full md:flex-1 min-w-[220px] group">
                  <select 
                    className={`neu-select ${selectedProductObject ? 'product-select-has-value' : ''}`} 
                    value={selectedProduct}
                    title={selectedProductObject ? `${selectedProductObject.Ref} - ${selectedProductObject.Name}` : t('Product')}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="default" disabled hidden>{t('Product')}</option>
                    <option value="default" className="text-slate-400">{t('All Products')}</option>
                    {filteredProductsDropdown.map((p) => (
                      <option key={p.Id} value={p.Id} title={`${p.Ref} - ${p.Name}`}>
                        {p.Ref} - {p.Name}
                      </option>
                    ))}
                  </select>
                  {selectedProductObject && (
                    <span className="pointer-events-none absolute left-6 right-12 top-1/2 -translate-y-1/2 truncate font-medium text-slate-600">
                      {selectedProductObject.Ref}
                    </span>
                  )}
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-hover:text-[#1447d7] transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Luxury Results Section */}
              <div className="mt-12 md:mt-16 px-6 sm:px-12">

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                      {t('Available IFU Documents')}
                    </h2>
                    {selectedProductObject && (
                      <div className="glass-panel px-4 py-1.5 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-[#1447d7] font-extrabold text-sm">{ifuDocuments.length}</span>
                      </div>
                    )}
                  </div>
                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors bg-white/50 hover:bg-white rounded-full shadow-sm"
                    >
                      <X className="w-4 h-4" />
                      {t('Clear Filters')}
                    </button>
                  )}
                </div>
                
                {selectedProduct !== 'default' ? (() => {
                  const product = selectedProductObject;
                  if (!product) return null;

                  return (
                    <div className="glass-panel rounded-[32px] p-8 md:p-10">
                      {/* Product Header inside the card */}
                      <div className="mb-8 pb-6 border-b border-slate-200/60">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">{t('Selected Product')}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <span className="bg-white/70 px-3.5 py-1.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm border border-white/60 w-fit">
                            REF: {product.Ref}
                          </span>
                          <span className="text-xl font-bold text-[#1447d7] drop-shadow-sm">{product.Name}</span>
                        </div>
                        {(product.Group || product.Platform) && (
                          <div className="flex items-center gap-3 mt-3 flex-wrap">
                            {product.Group && (
                              <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full">{product.Group}</span>
                            )}
                            {product.Platform && (
                              <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full">{product.Platform}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Document label */}
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">{t('Documents')}</p>

                      {/* Document Rows */}
                      <div className="space-y-0 divide-y divide-slate-100/80">
                        {isLoadingIfuDocuments ? (
                          <div className="py-6 text-sm font-semibold text-slate-400">{t('Searching...')}</div>
                        ) : ifuDocuments.length > 0 ? (
                          ifuDocuments.map((doc) => (
                            <div key={doc.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 group/row">
                              <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/80">
                                  <FileText className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-base font-semibold text-slate-800 group-hover/row:text-[#1447d7] transition-colors">
                                    {doc.language.nativeName} IFU
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <span className="ifu-language-badge">
                                      <span aria-hidden="true">{doc.language.flag}</span>
                                      <span>{doc.language.nativeName}</span>
                                    </span>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-50/80 px-2 py-0.5 rounded">
                                      {doc.language.code.toUpperCase()}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-xs text-green-500 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      {t('Latest revision')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 lg:justify-end">
                                <a
                                  href={`${API_BASE_URL}${doc.viewUrl}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-5 py-2 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1447d7] hover:text-[#0f3fb8] font-bold text-sm rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md border border-white/80 hover:border-[#1447d7]/20"
                                >
                                  {doc.language.nativeName} IFU {t('View PDF')}
                                  <FileText className="h-4 w-4" />
                                </a>
                                <a
                                  href={`${API_BASE_URL}${doc.downloadUrl}`}
                                  className="px-4 py-2 bg-white/55 backdrop-blur-sm hover:bg-white text-slate-500 hover:text-[#1447d7] font-bold text-sm rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md border border-white/70 hover:border-[#1447d7]/20"
                                >
                                  {t('Download PDF')}
                                  <Download className="h-4 w-4" />
                                </a>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-sm font-semibold text-slate-400">
                            {t('No IFU documents are available for this product and country.')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })() : (
                  /* Empty State — no product selected */
                  <div className="glass-panel rounded-[32px] p-16 text-center flex flex-col items-center justify-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-slate-50/80 flex items-center justify-center shadow-sm border border-white/80">
                      <FileText className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-slate-400 max-w-md leading-relaxed">
                      {t('Please select a product to view available IFU documents.')}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="px-0 sm:px-6 lg:px-0">
              <div className="relative rounded-[40px] p-10 md:p-14 overflow-hidden shadow-brand-hover border border-white/10 group mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e56ff] via-[#1447d7] to-[#0a2a85] opacity-95"></div>
                <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-[40px]"></div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/14 border border-white/20 flex items-center justify-center shadow-sm">
                    <Archive className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                    {t('IFU Archive')}
                  </h3>
                  <p className="text-blue-50/90 text-lg md:text-xl max-w-3xl font-light leading-relaxed drop-shadow-sm">
                    {t('Superseded and historical Instructions for Use documents are listed here for traceability.')}
                  </p>
                </div>
              </div>

              <div className="glass-panel rounded-[32px] p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">{t('Archived')}</p>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('Archived IFU Documents')}</h2>
                  </div>
                  <div className="glass-panel px-4 py-1.5 rounded-full flex items-center justify-center shadow-sm w-fit">
                    <span className="text-[#1447d7] font-extrabold text-sm">{archiveDocuments.length}</span>
                  </div>
                </div>

                {isLoadingArchive ? (
                  <div className="py-14 text-center text-sm font-semibold text-slate-400">{t('Searching...')}</div>
                ) : archiveDocuments.length > 0 ? (
                  <div className="space-y-3">
                    {archiveDocuments.map((document) => (
                      <div key={document.id} className="archive-document-row rounded-[24px] p-4 md:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
                        <div className="flex items-start gap-4 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/80">
                            <FileText className="w-5 h-5 text-red-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-base md:text-lg font-extrabold text-slate-800 truncate" title={document.filename}>
                              {document.title}
                            </p>
                            <p className="text-xs font-semibold text-slate-400 mt-1 truncate" title={document.filename}>
                              {document.filename}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <span className="ifu-language-badge">
                                <span aria-hidden="true">{document.language.flag}</span>
                                <span>{document.language.nativeName}</span>
                                <span className="text-slate-400">/ {document.language.name}</span>
                              </span>
                              <span className="text-xs font-bold text-slate-500 bg-white/70 px-2.5 py-1 rounded-full border border-white/70">
                                {t('Archive Year')}: {document.versionLabel}
                              </span>
                              <span className="text-xs font-bold text-amber-600 bg-amber-50/90 px-2.5 py-1 rounded-full border border-amber-100">
                                {t('Superseded')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 xl:justify-end">
                          <a
                            href={`${API_BASE_URL}${document.viewUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-5 py-2 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1447d7] hover:text-[#0f3fb8] font-bold text-sm rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md border border-white/80 hover:border-[#1447d7]/20"
                          >
                            {t('View PDF')}
                            <FileText className="h-4 w-4" />
                          </a>
                          <a
                            href={`${API_BASE_URL}${document.downloadUrl}`}
                            className="px-4 py-2 bg-white/55 backdrop-blur-sm hover:bg-white text-slate-500 hover:text-[#1447d7] font-bold text-sm rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md border border-white/70 hover:border-[#1447d7]/20"
                          >
                            {t('Download PDF')}
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-14 text-center text-sm font-semibold text-slate-400">
                    {t('No archived IFU documents are available.')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
      {isLabelGuideModalOpen && <LabelGuideModal onClose={() => setIsLabelGuideModalOpen(false)} />}
    </div>
  );
};

export default EifuPortal;
