import { PersonIdentity, GeoLocationData } from '../types';

export const TRANSLATIONS = {
  en: {
    appName: 'GeoIdentity',
    tagline: 'IP Geolocation & Localized Identity Profile Generator',
    description: 'Enter any IP address to detect its country and instantly generate authentic localized identity details: first name, last name, street address, city, state, email, and phone number.',
    searchPlaceholder: 'Enter IPv4 or IPv6 (e.g. 103.230.104.1 or 8.8.8.8)',
    btnLookup: 'Lookup IP',
    btnDetectMyIp: 'Detect My IP',
    presetHeading: 'Quick Sample IPs:',
    loadingGeo: 'Resolving IP geolocation & country info...',
    loadingProfile: 'Generating localized identity profile...',
    countryCardTitle: 'Detected Geolocation & Network',
    identityCardTitle: 'Localized Identity Matching Detected Country',
    identitySubtitle: 'Synthesized with culturally authentic names, addresses, and local formatting',
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    gender: 'Gender',
    streetAddress: 'Street Address',
    secondaryAddress: 'Apt / Suite / Unit',
    city: 'City',
    state: 'State / Region',
    postalCode: 'Postal / ZIP Code',
    country: 'Country',
    email: 'Email Address',
    phone: 'Phone Number',
    dob: 'Date of Birth',
    age: 'Age',
    occupation: 'Occupation',
    company: 'Company',
    nationalId: 'National ID / Tax ID',
    username: 'Username',
    ipAddress: 'IP Address',
    isp: 'ISP / Organization',
    timezone: 'Timezone',
    localTime: 'Current Local Time',
    coordinates: 'Coordinates',
    continent: 'Continent',
    currency: 'Currency',
    copyAll: 'Copy All Details',
    copied: 'Copied!',
    copyField: 'Copy',
    generateNew: 'Generate New Identity for this Location',
    downloadJson: 'Download JSON',
    downloadVcf: 'Download vCard (.vcf)',
    recentLookups: 'Recent IP Lookups',
    clearHistory: 'Clear History',
    noHistory: 'No recent IP lookups yet.',
    genderFilter: 'Gender Filter',
    allGenders: 'All',
    male: 'Male',
    female: 'Female',
    mapTitle: 'Approximate Location Map',
    openInOsm: 'View on OpenStreetMap',
    invalidIpWarning: 'Please enter a valid IPv4 or IPv6 address.',
  },
  bn: {
    appName: 'জিওআইডেন্টিটি',
    tagline: 'আইপি জিওলোকেশন এবং স্থানীয় পরিচয় জেনারেটর',
    description: 'যেকোনো আইপি অ্যাড্রেস লিখুন, এটি কোন দেশের তা শনাক্ত করবে এবং নিচে সুন্দরভাবে সেই দেশের ফার্স্ট নেম, লাস্ট নেম, স্ট্রিট, সিটি, স্টেট, ইমেইল এবং ফোন নাম্বার প্রদর্শন করবে।',
    searchPlaceholder: 'আইপি অ্যাড্রেস লিখুন (যেমন ১০৩.২৩০.১০৪.১ বা ৮.৮.৮.৮)',
    btnLookup: 'আইপি খুঁজুন',
    btnDetectMyIp: 'আমার আইপি শনাক্ত করুন',
    presetHeading: 'নমুনা আইপি টেস্ট করুন:',
    loadingGeo: 'আইপি ঠিকানা ও দেশের তথ্য অনুসন্ধান করা হচ্ছে...',
    loadingProfile: 'স্থানীয় পরিচয় প্রস্তুত করা হচ্ছে...',
    countryCardTitle: 'শনাক্তকৃত দেশের তথ্য ও নেটওয়ার্ক',
    identityCardTitle: 'সেই দেশের সাথে সামঞ্জস্যপূর্ণ পরিচয় (Identity)',
    identitySubtitle: 'সংশ্লিষ্ট দেশের স্থানীয় নাম, ঠিকানা ও ফরম্যাট অনুযায়ী তৈরি',
    firstName: 'ফার্স্ট নেম (First Name)',
    lastName: 'লাস্ট নেম (Last Name)',
    fullName: 'সম্পূর্ণ নাম (Full Name)',
    gender: 'লিঙ্গ',
    streetAddress: 'রাস্তার ঠিকানা (Street)',
    secondaryAddress: 'ফ্ল্যাট / অ্যাপার্টমেন্ট',
    city: 'শহর (City)',
    state: 'রাজ্য / বিভাগ (State)',
    postalCode: 'পোস্টাল / জিপ কোড (Postal)',
    country: 'দেশ (Country)',
    email: 'ইমেইল (Mail)',
    phone: 'ফোন নম্বর (Phone)',
    dob: 'জন্ম তারিখ (DOB)',
    age: 'বয়স (Age)',
    occupation: 'পেশা (Job Title)',
    company: 'প্রতিষ্ঠান (Company)',
    nationalId: 'জাতীয় পরিচয়পত্র (NID/SSN)',
    username: 'ব্যবহারকারী নাম (Username)',
    ipAddress: 'আইপি অ্যাড্রেস (IP)',
    isp: 'ইন্টারনেট সেবাদাতা (ISP)',
    timezone: 'টাইমজোন',
    localTime: 'স্থানীয় সময়',
    coordinates: 'ভৌগোলিক স্থানাঙ্ক (Coordinates)',
    continent: 'মহাদেশ',
    currency: 'মুদ্রা',
    copyAll: 'সব তথ্য কপি করুন',
    copied: 'কপি হয়েছে!',
    copyField: 'কপি',
    generateNew: 'এই দেশের নতুন পরিচয় তৈরি করুন',
    downloadJson: 'JSON ডাউনলোড',
    downloadVcf: 'vCard (.vcf) ডাউনলোড',
    recentLookups: 'পূর্ববর্তী আইপি অনুসন্ধান',
    clearHistory: 'হিস্ট্রি মুছুন',
    noHistory: 'এখনও কোনো আইপি অনুসন্ধান করা হয়নি।',
    genderFilter: 'লিঙ্গ নির্বাচন',
    allGenders: 'সব',
    male: 'পুরুষ',
    female: 'নারী',
    mapTitle: 'মানচিত্রে ভৌগোলিক অবস্থান',
    openInOsm: 'ওপেনস্ট্রিটম্যাপে দেখুন',
    invalidIpWarning: 'অনুগ্রহ করে সঠিক IPv4 বা IPv6 অ্যাড্রেস লিখুন।',
  }
};

export function exportToJson(identity: PersonIdentity, geo: GeoLocationData): void {
  const data = {
    generatedAt: new Date().toISOString(),
    ipGeolocation: geo,
    personIdentity: identity
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `identity_${identity.firstName}_${identity.lastName}_${identity.countryCode}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToVcf(identity: PersonIdentity): void {
  const vcfContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${identity.lastName};${identity.firstName};;;`,
    `FN:${identity.fullName}`,
    `ORG:${identity.company}`,
    `TITLE:${identity.occupation}`,
    `EMAIL;type=INTERNET;type=WORK:${identity.email}`,
    `TEL;type=CELL:${identity.phone}`,
    `ADR;type=HOME:;;${identity.streetAddress};${identity.city};${identity.state};${identity.postalCode};${identity.country}`,
    `NOTE:Generated by GeoIdentity for IP region ${identity.country}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${identity.firstName}_${identity.lastName}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatFullText(identity: PersonIdentity, geo: GeoLocationData): string {
  return [
    `First Name: ${identity.firstName}`,
    `Last Name: ${identity.lastName}`,
    `Pet Name: ${identity.petName}`,
    `Street: ${identity.streetAddress}`,
    `City: ${identity.city}`,
    `State: ${identity.state}`,
    `Mail: ${identity.email}`,
    `Postal Code: ${identity.postalCode}`,
    `Phone: ${identity.phone}`,
    `Country: ${geo.country} (${geo.countryCode})`
  ].join('\n');
}
