import { GeoLocationData, PersonIdentity } from '../types';

interface LocaleData {
  maleFirstNames: string[];
  femaleFirstNames: string[];
  lastNames: string[];
  realStreets: (city?: string, region?: string) => string;
  phoneGen: (city?: string, region?: string) => string;
  postalCodeGen: (detectedPostal?: string, city?: string) => string;
}

const LOCALES: Record<string, LocaleData> = {
  // Bangladesh (Real streets, authentic BD mobile operator numbers, real postal codes)
  BD: {
    maleFirstNames: [
      'Tanvir', 'Rahat', 'Arif', 'Mahmud', 'Nafis', 'Shakib', 'Imtiaz', 'Fahim',
      'Zubair', 'Hasan', 'Tariq', 'Sadman', 'Tamim', 'Rakib', 'Sabbir', 'Asif',
      'Nasir', 'Shafiq', 'Arman', 'Kawsar', 'Rayhan', 'Mehedi', 'Anik', 'Munir'
    ],
    femaleFirstNames: [
      'Nusrat', 'Farhana', 'Sadia', 'Tasnim', 'Tanjina', 'Sharmin', 'Afrin', 'Samira',
      'Nazia', 'Roksana', 'Mehnaz', 'Jannatul', 'Lubna', 'Shirin', 'Rumana', 'Humaira',
      'Farzana', 'Shahnaz', 'Tahmina', 'Zinia', 'Sumaiya', 'Anika', 'Sabrina', 'Tamanna'
    ],
    lastNames: [
      'Rahman', 'Chowdhury', 'Hossain', 'Ahmed', 'Islam', 'Haque', 'Khan', 'Sikder',
      'Talukdar', 'Majumder', 'Bhuiyan', 'Miah', 'Sarker', 'Alam', 'Karim', 'Uddin',
      'Mahmood', 'Siddique', 'Gazi', 'Barua', 'Kazi', 'Munshi'
    ],
    realStreets: (city) => {
      const isChittagong = city && /chittagong|chattogram/i.test(city);
      const isSylhet = city && /sylhet/i.test(city);

      if (isChittagong) {
        const ctgStreets = [
          'House #24, Road #4, O.R. Nizam Road, CDA Avenue',
          'Holding #12, Nasirabad Housing Society, Road #2',
          'Plot #8, GEC Circle, Agrabad Commercial Area',
          'House #15, Road #1, South Khulshi R/A',
          'House #42, Mehedibag Road, Kotwali'
        ];
        return ctgStreets[Math.floor(Math.random() * ctgStreets.length)];
      }

      if (isSylhet) {
        const sylhetStreets = [
          'House #18, Zindabazar Main Road',
          'Plot #5, Amberkhana Point',
          'House #32, Road #3, Upashahar Block D',
          'Holding #14, Darga Gate, Mirabazar'
        ];
        return sylhetStreets[Math.floor(Math.random() * sylhetStreets.length)];
      }

      // Default: Real Dhaka streets
      const dhakaStreets = [
        'House #14, Road #11, Block D, Banani',
        'Plot #7, Kemal Ataturk Avenue, Gulshan-2',
        'House #42, Road #27 (Old), Dhanmondi R/A',
        'House #8, Road #3, Sector #4, Uttara',
        'House #23, Road #7, Block C, Niketan, Gulshan-1',
        '54/1 Kazi Nazrul Islam Avenue, Kawran Bazar',
        'Holding #19, Mirpur Road, Section 10',
        'House #35, Road #2, Block B, Bashundhara R/A',
        'House #12, Satmasjid Road, Dhanmondi 9/A',
        'Plot #15, Pragati Sarani, Baridhara',
        'House #6, Road #12, Sector #7, Uttara Model Town',
        'Holding #45, Green Road, Farmgate'
      ];
      return dhakaStreets[Math.floor(Math.random() * dhakaStreets.length)];
    },
    // Real Bangladeshi mobile operators: Grameenphone (017, 013), Robi (018), Banglalink (019, 014), Airtel (016)
    phoneGen: () => {
      const realPrefixes = ['1711', '1712', '1715', '1819', '1817', '1911', '1914', '1611', '1312', '1720'];
      const prefix = realPrefixes[Math.floor(Math.random() * realPrefixes.length)];
      const subscriber = Math.floor(100000 + Math.random() * 900000);
      return `+880 ${prefix}-${subscriber}`;
    },
    postalCodeGen: (detected, city) => {
      if (detected && /^\d{4}$/.test(detected.trim())) {
        return detected.trim();
      }
      if (city && /chittagong|chattogram/i.test(city)) return '4000';
      if (city && /sylhet/i.test(city)) return '3100';
      if (city && /rajshahi/i.test(city)) return '6000';
      if (city && /khulna/i.test(city)) return '9000';
      // Real Dhaka postal codes
      const dhakaZips = ['1212', '1213', '1205', '1230', '1216', '1215', '1209', '1229'];
      return dhakaZips[Math.floor(Math.random() * dhakaZips.length)];
    }
  },

  // United States (Real streets, state-matched authentic area codes, real zip codes)
  US: {
    maleFirstNames: [
      'James', 'Michael', 'Robert', 'David', 'William', 'Richard', 'Joseph', 'Thomas',
      'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Ethan', 'Alexander', 'Benjamin'
    ],
    femaleFirstNames: [
      'Emily', 'Sarah', 'Jessica', 'Ashley', 'Amanda', 'Jennifer', 'Elizabeth', 'Megan',
      'Samantha', 'Lauren', 'Hannah', 'Rachel', 'Taylor', 'Olivia', 'Emma', 'Sophia'
    ],
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
    ],
    realStreets: (city, region) => {
      const reg = (region || '').toLowerCase();
      const cty = (city || '').toLowerCase();

      if (reg.includes('california') || cty.includes('mountain view') || cty.includes('san francisco') || cty.includes('san jose')) {
        const caStreets = [
          '500 W Middlefield Rd, Apt 24',
          '800 W El Camino Real, Ste 180',
          '450 Castro St, Unit 3B',
          '1200 Market St, Apt 412',
          '350 California St, Ste 500',
          '500 Howard St, Apt 8A',
          '1600 Villa St, Apt 112',
          '750 Harrison St, Unit 204',
          '100 Winchester Blvd, Apt 315',
          '2400 Charleston Rd, Bldg B'
        ];
        return caStreets[Math.floor(Math.random() * caStreets.length)];
      }

      if (reg.includes('new york') || cty.includes('new york')) {
        const nyStreets = [
          '350 5th Ave, Apt 14C',
          '767 5th Ave, Ste 22A',
          '240 E 38th St, Apt 9B',
          '150 W 56th St, Unit 28E',
          '590 Madison Ave, Apt 11F',
          '401 8th Ave, Apt 4A',
          '200 Park Ave, Ste 1200',
          '100 Wall St, Apt 16B'
        ];
        return nyStreets[Math.floor(Math.random() * nyStreets.length)];
      }

      if (reg.includes('texas') || cty.includes('austin') || cty.includes('dallas') || cty.includes('houston')) {
        const txStreets = [
          '500 Congress Ave, Unit 12B',
          '1000 Main St, Apt 410',
          '2100 Ross Ave, Ste 800',
          '700 Louisiana St, Ste 1500',
          '1200 S Congress Ave, Apt 304'
        ];
        return txStreets[Math.floor(Math.random() * txStreets.length)];
      }

      if (reg.includes('florida') || cty.includes('miami')) {
        const flStreets = [
          '1200 Brickell Bay Dr, Apt 1802',
          '475 Brickell Ave, Unit 2204',
          '1000 Biscayne Blvd, Apt 1505',
          '800 Ocean Dr, Apt 4B'
        ];
        return flStreets[Math.floor(Math.random() * flStreets.length)];
      }

      const generalStreets = [
        '742 Evergreen Terrace',
        '1250 Washington Blvd, Apt 3C',
        '420 Lincoln Ave, Unit 12',
        '850 Sunset Blvd, Ste 400',
        '310 Highland Pkwy, Apt 2B',
        '620 Lexington Ave, Ste 300',
        '150 Elm Street, Unit 5',
        '920 Maple Avenue, Apt 8'
      ];
      return generalStreets[Math.floor(Math.random() * generalStreets.length)];
    },
    // Real US phone number with authentic area codes matching state
    phoneGen: (city, region) => {
      const reg = (region || '').toLowerCase();
      let areaCode = '415';

      if (reg.includes('california')) {
        const caAreas = ['415', '650', '408', '510', '213', '310', '949', '858', '916'];
        areaCode = caAreas[Math.floor(Math.random() * caAreas.length)];
      } else if (reg.includes('new york')) {
        const nyAreas = ['212', '718', '917', '646', '347', '516', '914'];
        areaCode = nyAreas[Math.floor(Math.random() * nyAreas.length)];
      } else if (reg.includes('texas')) {
        const txAreas = ['512', '214', '713', '210', '832', '972'];
        areaCode = txAreas[Math.floor(Math.random() * txAreas.length)];
      } else if (reg.includes('washington')) {
        areaCode = '206';
      } else if (reg.includes('florida')) {
        areaCode = '305';
      } else {
        const standardAreas = ['202', '312', '404', '617', '215', '303', '702', '602'];
        areaCode = standardAreas[Math.floor(Math.random() * standardAreas.length)];
      }

      const exchange = Math.floor(201 + Math.random() * 700);
      const line = Math.floor(1000 + Math.random() * 9000);
      return `+1 (${areaCode}) ${exchange}-${line}`;
    },
    postalCodeGen: (detected) => {
      if (detected && /^\d{5}/.test(detected.trim())) {
        return detected.trim();
      }
      return '94043';
    }
  },

  // United Kingdom (Real London/UK streets, real UK mobile/landline numbers, real postcodes)
  GB: {
    maleFirstNames: [
      'Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Noah', 'Charlie', 'William',
      'Henry', 'Thomas', 'Alfie', 'Freddie', 'Archie', 'Leo', 'Arthur', 'Oscar'
    ],
    femaleFirstNames: [
      'Amelia', 'Olivia', 'Isla', 'Emily', 'Ava', 'Jessica', 'Poppy', 'Ella',
      'Mia', 'Florence', 'Grace', 'Sophia', 'Charlotte', 'Lily', 'Freya', 'Alice'
    ],
    lastNames: [
      'Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies',
      'Robinson', 'Wright', 'Thompson', 'Evans', 'Walker', 'White', 'Edwards', 'Hughes'
    ],
    realStreets: () => {
      const ukStreets = [
        '221B Baker Street',
        '14 Oxford Street',
        '88 Piccadilly',
        '45 Kensington High Street',
        '12 Fleet Street',
        '64 King\'s Road',
        '25 Victoria Street',
        '10 Downing Street',
        '150 High Street',
        '78 Regent Street'
      ];
      return ukStreets[Math.floor(Math.random() * ukStreets.length)];
    },
    // Real UK mobile numbers: +44 7...
    phoneGen: () => {
      const prefixes = ['7700', '7911', '7823', '7401', '7520', '7946'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const num = Math.floor(100000 + Math.random() * 900000);
      return `+44 ${prefix} ${num}`;
    },
    postalCodeGen: (detected) => {
      if (detected && detected.length >= 5) return detected.trim();
      const ukZips = ['EC1A 1BB', 'W1D 1BS', 'SW1A 1AA', 'WC2N 5DU', 'E1 6AN'];
      return ukZips[Math.floor(Math.random() * ukZips.length)];
    }
  },

  // Germany (Real German streets, mobile prefixes, real PLZ postcodes)
  DE: {
    maleFirstNames: [
      'Lukas', 'Leon', 'Finn', 'Paul', 'Jonas', 'Maximilian', 'Ben', 'Felix',
      'Elias', 'Niklas', 'Julian', 'Moritz', 'Alexander', 'Florian', 'Tobias'
    ],
    femaleFirstNames: [
      'Sophie', 'Marie', 'Hannah', 'Mia', 'Emma', 'Anna', 'Lena', 'Leonie',
      'Lina', 'Emily', 'Sarah', 'Lara', 'Laura', 'Nele', 'Johanna', 'Lea'
    ],
    lastNames: [
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker',
      'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf'
    ],
    realStreets: () => {
      const deStreets = [
        'Kaiserstraße 29',
        'Mainzer Landstraße 180',
        'Friedrichstraße 43',
        'Kurfürstendamm 115',
        'Schillerstraße 14',
        'Goethestraße 32',
        'Zeil 106',
        'Westhafen Tower 1',
        'Bahnhofstraße 45'
      ];
      return deStreets[Math.floor(Math.random() * deStreets.length)];
    },
    // Real German mobile prefixes: +49 151, +49 160, +49 171, +49 175
    phoneGen: () => {
      const prefixes = ['151', '160', '171', '175', '152', '176'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return `+49 ${prefix} ${num}`;
    },
    postalCodeGen: (detected) => {
      if (detected && /^\d{5}$/.test(detected.trim())) return detected.trim();
      const dePlz = ['60311', '10115', '80331', '20095', '50667'];
      return dePlz[Math.floor(Math.random() * dePlz.length)];
    }
  },

  // Japan (Real Tokyo streets, authentic Japanese mobile 090/080 numbers, real postal codes)
  JP: {
    maleFirstNames: [
      'Ren', 'Haruto', 'Sota', 'Yuto', 'Riku', 'Haruki', 'Kento', 'Taiki',
      'Daiki', 'Hiroshi', 'Kenji', 'Shinji', 'Takuya', 'Kazuki', 'Ryota'
    ],
    femaleFirstNames: [
      'Hina', 'Yui', 'Aoi', 'Rin', 'Mio', 'Akari', 'Mei', 'Sakura',
      'Nanami', 'Honoka', 'Ayaka', 'Misaki', 'Haruka', 'Yuka', 'Emi'
    ],
    lastNames: [
      'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura',
      'Kobayashi', 'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Saito', 'Matsumoto'
    ],
    realStreets: () => {
      const jpStreets = [
        '6-10-1 Roppongi, Minato-ku',
        '1-1 Chiyoda, Chiyoda-ku',
        '2-21-1 Shibuya, Shibuya-ku',
        '4-5-6 Ginza, Chuo-ku',
        '3-1-1 Shinjuku, Shinjuku-ku',
        '1-8-1 Omotesando, Shibuya-ku'
      ];
      return jpStreets[Math.floor(Math.random() * jpStreets.length)];
    },
    phoneGen: () => {
      const prefixes = ['90', '80', '70'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const part1 = Math.floor(1000 + Math.random() * 9000);
      const part2 = Math.floor(1000 + Math.random() * 9000);
      return `+81 ${prefix}-${part1}-${part2}`;
    },
    postalCodeGen: (detected) => {
      if (detected && detected.length >= 7) return detected.trim();
      const jpZips = ['100-0001', '106-0032', '150-0002', '104-0061', '160-0022'];
      return jpZips[Math.floor(Math.random() * jpZips.length)];
    }
  },

  // India (Real Mumbai/Delhi/Bangalore streets, real Indian mobile numbers, real PIN codes)
  IN: {
    maleFirstNames: [
      'Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna',
      'Ishaan', 'Shaurya', 'Rohan', 'Kabir', 'Aryan', 'Vikram', 'Dhruv', 'Karan'
    ],
    femaleFirstNames: [
      'Aadhya', 'Ananya', 'Diya', 'Saanvi', 'Kiara', 'Ira', 'Myra', 'Anushka',
      'Pooja', 'Riya', 'Sneha', 'Priyanka', 'Neha', 'Shreya', 'Deepika', 'Kavya'
    ],
    lastNames: [
      'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Rao', 'Iyer', 'Gupta',
      'Reddy', 'Nair', 'Mehta', 'Chopra', 'Joshi', 'Mukherjee', 'Chatterjee', 'Das'
    ],
    realStreets: () => {
      const inStreets = [
        '14 Mahatma Gandhi (MG) Road',
        '88 Brigade Road',
        '24 Park Street',
        'Linking Road, Bandra West',
        '12 Connaught Place, Inner Circle',
        '45 Anna Salai, Mount Road',
        '100 Feet Road, Indiranagar',
        'Marine Drive, Nariman Point'
      ];
      return inStreets[Math.floor(Math.random() * inStreets.length)];
    },
    phoneGen: () => {
      const prefixes = ['98201', '98110', '97170', '98450', '99001', '98300'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const num = Math.floor(10000 + Math.random() * 90000);
      return `+91 ${prefix} ${num}`;
    },
    postalCodeGen: (detected) => {
      if (detected && /^\d{6}$/.test(detected.trim())) return detected.trim();
      const inPins = ['400001', '110001', '560001', '700016', '600002'];
      return inPins[Math.floor(Math.random() * inPins.length)];
    }
  },

  // Canada (Real Toronto/Vancouver/Montreal streets, authentic area codes, real postal codes)
  CA: {
    maleFirstNames: ['Liam', 'Noah', 'William', 'Benjamin', 'Lucas', 'Oliver', 'Logan', 'Jack', 'Ethan'],
    femaleFirstNames: ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Chloe', 'Sophia', 'Mia', 'Zoe'],
    lastNames: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Gagnon', 'Johnson', 'Taylor'],
    realStreets: () => {
      const caStreets = [
        '250 Yonge Street',
        '100 Queen Street West',
        '161 Bay Street',
        '1250 René-Lévesque Blvd West',
        '700 West Georgia Street',
        '40 King Street West',
        '1000 Sherbrooke Street West'
      ];
      return caStreets[Math.floor(Math.random() * caStreets.length)];
    },
    phoneGen: () => {
      const areas = ['416', '647', '514', '604', '403', '613'];
      const area = areas[Math.floor(Math.random() * areas.length)];
      const mid = Math.floor(200 + Math.random() * 700);
      const line = Math.floor(1000 + Math.random() * 9000);
      return `+1 (${area}) ${mid}-${line}`;
    },
    postalCodeGen: (detected) => {
      if (detected && detected.length >= 6) return detected.trim();
      const caZips = ['M5H 2N2', 'M5V 3L9', 'H3B 4W8', 'V6C 2T8', 'K1P 1J1'];
      return caZips[Math.floor(Math.random() * caZips.length)];
    }
  },

  // Australia (Real Sydney/Melbourne streets, authentic Australian mobile numbers, real postcodes)
  AU: {
    maleFirstNames: ['Oliver', 'Noah', 'Jack', 'William', 'Henry', 'Lucas', 'Thomas', 'Charlie', 'James'],
    femaleFirstNames: ['Charlotte', 'Amelia', 'Isla', 'Olivia', 'Mia', 'Ava', 'Grace', 'Willow', 'Harper'],
    lastNames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson'],
    realStreets: () => {
      const auStreets = [
        '200 George Street',
        '120 Collins Street',
        '250 Pitt Street',
        '360 Bourke Street',
        '140 Elizabeth Street',
        '100 Barangaroo Avenue',
        '500 Queen Street'
      ];
      return auStreets[Math.floor(Math.random() * auStreets.length)];
    },
    phoneGen: () => {
      const prefixes = ['412', '423', '434', '401', '414', '422'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const part1 = Math.floor(100 + Math.random() * 900);
      const part2 = Math.floor(100 + Math.random() * 900);
      return `+61 ${prefix} ${part1} ${part2}`;
    },
    postalCodeGen: (detected) => {
      if (detected && /^\d{4}$/.test(detected.trim())) return detected.trim();
      const auZips = ['2000', '3000', '4000', '6000', '5000'];
      return auZips[Math.floor(Math.random() * auZips.length)];
    }
  },

  // France (Real Paris streets, authentic French mobile numbers, real postcodes)
  FR: {
    maleFirstNames: ['Gabriel', 'Léo', 'Raphaël', 'Arthur', 'Louis', 'Lucas', 'Adam', 'Jules', 'Hugo', 'Liam'],
    femaleFirstNames: ['Jade', 'Louise', 'Emma', 'Ambre', 'Alice', 'Rose', 'Anna', 'Mila', 'Lina', 'Chloé'],
    lastNames: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau'],
    realStreets: () => {
      const frStreets = [
        '12 Rue de la Paix',
        '48 Boulevard Saint-Germain',
        '120 Avenue des Champs-Élysées',
        '35 Rue de Rivoli',
        '75 Avenue Victor Hugo',
        '22 Place Vendôme',
        '14 Rue du Faubourg Saint-Honoré'
      ];
      return frStreets[Math.floor(Math.random() * frStreets.length)];
    },
    phoneGen: () => {
      const prefixes = ['6', '7'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const p1 = Math.floor(10 + Math.random() * 89);
      const p2 = Math.floor(10 + Math.random() * 89);
      const p3 = Math.floor(10 + Math.random() * 89);
      const p4 = Math.floor(10 + Math.random() * 89);
      return `+33 ${prefix} ${p1} ${p2} ${p3} ${p4}`;
    },
    postalCodeGen: (detected) => {
      if (detected && /^\d{5}$/.test(detected.trim())) return detected.trim();
      const frZips = ['75001', '75008', '69002', '13001', '33000'];
      return frZips[Math.floor(Math.random() * frZips.length)];
    }
  }
};

// General fallback with real global calling code integration
const DEFAULT_LOCALE: LocaleData = {
  maleFirstNames: ['Alex', 'David', 'Daniel', 'Marcus', 'Leo', 'Lucas', 'Julian', 'Marco', 'Samuel', 'Victor'],
  femaleFirstNames: ['Elena', 'Sofia', 'Maria', 'Clara', 'Maya', 'Nora', 'Eva', 'Julia', 'Camila', 'Laura'],
  lastNames: ['Silva', 'Santos', 'Novak', 'Jensen', 'Rossi', 'Kowalski', 'Larsen', 'Mendoza', 'Petrov', 'Cruz'],
  realStreets: () => {
    const streets = [
      '14 Central Avenue',
      '88 Ocean View Drive',
      '250 Parkway Boulevard',
      '45 Grand Avenue',
      '12 Liberty Street',
      '100 Market Way'
    ];
    return streets[Math.floor(Math.random() * streets.length)];
  },
  phoneGen: () => {
    return `+1 (415) ${Math.floor(200 + Math.random() * 700)}-${Math.floor(1000 + Math.random() * 9000)}`;
  },
  postalCodeGen: (detected) => detected || '10001'
};

export function generateIdentity(
  geo: GeoLocationData,
  genderPreference: 'all' | 'male' | 'female' = 'all'
): PersonIdentity {
  const code = (geo.countryCode || 'US').toUpperCase();
  const locale = LOCALES[code] || DEFAULT_LOCALE;

  const gender: 'male' | 'female' =
    genderPreference === 'all'
      ? Math.random() > 0.5 ? 'male' : 'female'
      : genderPreference;

  const firstNames = gender === 'male' ? locale.maleFirstNames : locale.femaleFirstNames;
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = locale.lastNames[Math.floor(Math.random() * locale.lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  // Authentic International Pet Names (world-famous, globally popular pet names)
  const internationalPetNames = [
    'Max', 'Bella', 'Charlie', 'Luna', 'Lucy', 'Cooper', 'Bailey', 'Daisy',
    'Sadie', 'Molly', 'Buddy', 'Lola', 'Stella', 'Tucker', 'Milo', 'Bear',
    'Rocky', 'Leo', 'Duke', 'Teddy', 'Oliver', 'Chloe', 'Penny', 'Zoey',
    'Lily', 'Jack', 'Zeus', 'Ruby', 'Rosie', 'Riley', 'Harley', 'Sophie',
    'Toby', 'Roxy', 'Buster', 'Cody', 'Winston', 'Murphy', 'Bandit', 'Ziggy',
    'Dexter', 'Bruno', 'Apollo', 'Simba', 'Otis', 'Thor', 'Jax', 'Archie',
    'Gizmo', 'Lucky', 'Rusty', 'Shadow', 'Scout', 'Rex', 'Hunter', 'Jasper',
    'Finn', 'Sammy', 'Ollie', 'Ace', 'Gus', 'Beau', 'Brody', 'Hank',
    'Boomer', 'Diesel', 'Champ', 'Pepper', 'Cookie', 'Peanut', 'Oreo',
    'Hazel', 'Ginger', 'Abby', 'Sasha', 'Sandy', 'Cleo', 'Phoebe', 'Lady',
    'Honey', 'Dixie', 'Maya', 'Olive', 'Bonnie', 'Emma', 'Princess', 'Athena',
    'Harper', 'Nova', 'Kona', 'Dakota', 'Callie', 'Finnie', 'Muffin', 'Smokey',
    'Chester', 'Pumpkin', 'Mocha', 'Brownie', 'Bubbles', 'Snowy', 'Coco'
  ];
  const petName = internationalPetNames[Math.floor(Math.random() * internationalPetNames.length)];

  // Age between 21 and 55
  const age = Math.floor(22 + Math.random() * 34);
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthMonth = Math.floor(1 + Math.random() * 12);
  const birthDay = Math.floor(1 + Math.random() * 28);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dob = `${monthNames[birthMonth - 1]} ${birthDay < 10 ? '0' + birthDay : birthDay}, ${birthYear}`;

  // 1. Real Street Address
  const streetAddress = locale.realStreets(geo.city, geo.region);

  // 2. City and State: strictly synchronized with real IP geolocation
  const city = geo.city && geo.city !== 'Unknown' ? geo.city : (code === 'BD' ? 'Dhaka' : 'Capital City');
  const state = geo.region && geo.region !== 'Unknown' ? geo.region : (code === 'BD' ? 'Dhaka Division' : 'Region');

  // 3. Real Postal Code: strictly prefer geo.postal from IP lookup
  const postalCode = locale.postalCodeGen(geo.postal, geo.city);

  // 4. Real Phone Number formatted with real country operator code
  let phone = '';
  if (LOCALES[code]) {
    phone = LOCALES[code].phoneGen(geo.city, geo.region);
  } else if (geo.callingCode) {
    const subscriber = Math.floor(1000000 + Math.random() * 9000000);
    phone = `${geo.callingCode} ${Math.floor(100 + Math.random() * 899)} ${subscriber.toString().substring(0, 4)}`;
  } else {
    phone = locale.phoneGen(geo.city, geo.region);
  }

  // 5. Email strictly with @gmail.com
  const emailNum = Math.floor(10 + Math.random() * 89);
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
  const emailPatterns = [
    `${cleanFirst}.${cleanLast}${emailNum}@gmail.com`,
    `${cleanFirst}${cleanLast.charAt(0)}${emailNum}@gmail.com`,
    `${cleanLast}.${cleanFirst}${emailNum}@gmail.com`,
    `${cleanFirst}${cleanLast}@gmail.com`
  ];
  const email = emailPatterns[Math.floor(Math.random() * emailPatterns.length)];

  const username = `${cleanFirst}${cleanLast.slice(0, 3)}_${Math.floor(100 + Math.random() * 900)}`;

  return {
    id: `id_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    firstName,
    lastName,
    petName,
    fullName,
    gender,
    email,
    phone,
    streetAddress,
    city,
    state,
    postalCode,
    country: geo.country || 'Unknown',
    countryCode: code,
    dob,
    age,
    occupation: 'Professional',
    company: 'Enterprise Solutions',
    nationalIdType: 'ID',
    nationalIdNumber: '0000',
    username,
    avatarSeed: `${firstName}_${lastName}`
  };
}
