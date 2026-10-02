export interface GeoLocationData {
  ip: string;
  type?: 'IPv4' | 'IPv6';
  country: string;
  countryCode: string;
  countryFlag?: string;
  region: string;
  regionCode?: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  utcOffset?: string;
  currentTime?: string;
  isp: string;
  org?: string;
  asn?: string | number;
  callingCode?: string;
  currency?: string;
  currencyCode?: string;
  continent?: string;
}

export interface PersonIdentity {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  streetAddress: string;
  secondaryAddress?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  countryCode: string;
  dob: string;
  age: number;
  occupation: string;
  company: string;
  nationalIdType: string;
  nationalIdNumber: string;
  username: string;
  avatarSeed: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  fullName: string;
}

export type Language = 'en' | 'bn';
