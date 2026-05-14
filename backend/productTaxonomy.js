const textIncludes = (value, needle) => (
  String(value || '').toLowerCase().includes(needle)
);

const refNumber = (ref) => {
  const match = String(ref || '').match(/^\d+/);
  return match ? Number(match[0]) : null;
};

const hasAnyKeyword = (value, keywords) => (
  keywords.some((keyword) => textIncludes(value, keyword))
);

export const normalizeProductTaxonomy = (product) => {
  const normalized = { ...product };
  const name = normalized.name ?? normalized.Name ?? '';
  const group = normalized.group ?? normalized.Group ?? '';
  const ref = normalized.ref ?? normalized.Ref ?? '';
  const cleanName = String(name).replaceAll('Agressive', 'Aggressive');
  const lowerName = cleanName.toLowerCase();

  if (normalized.name !== undefined) normalized.name = cleanName;
  if (normalized.Name !== undefined) normalized.Name = cleanName;

  let nextGroup = group;
  let nextSubcategory = normalized.subcategory ?? normalized.Subcategory ?? '';

  if (group === 'Implant' || group === 'Implants') {
    nextGroup = 'Implants';
    if (textIncludes(lowerName, 'passive')) {
      nextSubcategory = 'TA Switch Plus Passive';
    } else if (textIncludes(lowerName, 'aggressive')) {
      nextSubcategory = 'TA Switch Plus Aggressive';
    }
  } else if (group === 'Abutment Screws' || group === 'Cementable Abutments' || group === 'Prosthetic Profiles') {
    nextGroup = 'Prosthetic Profiles';
    if (textIncludes(lowerName, 'screw')) {
      nextSubcategory = 'Abutment Screws';
    } else if (textIncludes(lowerName, 'cementable')) {
      nextSubcategory = 'Cementable Abutments';
    } else {
      nextSubcategory = nextSubcategory || (group === 'Abutment Screws' ? 'Abutment Screws' : 'Cementable Abutments');
    }
  } else if (group === 'All-On-TA') {
    const isAccessory = hasAnyKeyword(lowerName, ['screw', 'instrument', 'driver', 'tool', 'accessory']);
    nextSubcategory = !isAccessory && textIncludes(lowerName, 'abutment')
      ? 'All-On-TA Abutments'
      : 'All-On-TA Accessories';
  } else if (group === 'CADCAM') {
    nextSubcategory = textIncludes(lowerName, 'scan body')
      ? 'Scan Bodies'
      : 'CADCAM Abutments';
  } else if (group === 'Cover Screws & Gingiva Formers') {
    nextSubcategory = textIncludes(lowerName, 'cover screw')
      ? 'Cover Screws'
      : 'Gingiva Formers';
  } else if (group === 'Instruments and Accessories') {
    nextSubcategory = '';
  } else if (group === 'Prosthetic Clicloc') {
    const numericRef = refNumber(ref);
    nextSubcategory = numericRef >= 208001 && numericRef <= 208006
      ? 'Clicloc Abutments'
      : 'Clicloc Accessories';
  }

  if (normalized.group !== undefined) normalized.group = nextGroup;
  if (normalized.Group !== undefined) normalized.Group = nextGroup;
  normalized.subcategory = nextSubcategory;
  if (normalized.Subcategory !== undefined) normalized.Subcategory = nextSubcategory;

  return normalized;
};
