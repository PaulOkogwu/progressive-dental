export const site = {
  name: 'Progressive Dental Studio Inc.',
  tagline: 'Committed to excellence through service and technology',
  address: { street: '74 Queen St North', city: 'Kitchener', region: 'Ontario', postal: 'N2H 2H3' },
  landmark: 'Queen St & Weber St, across from the Kitchener Main Public Library',
  email: 'lab@progressivedental.ca',
  phone: { label: '519-893-4010', href: 'tel:+15198934010' },
  tollFree: { label: '800-265-2382', href: 'tel:+18002652382' },
  hours: [
    { days: 'Monday – Thursday', short: 'Mon–Thu', time: '8:30 am – 5:00 pm' },
    { days: 'Friday', short: 'Fri', time: '8:30 am – 2:00 pm' },
    { days: 'Saturday & Sunday', short: 'Sat–Sun', time: 'Closed' },
  ],
  mapQuery: '74 Queen St N, Kitchener, ON N2H 2H3',
  // Web3Forms access key (public by design; it only identifies the inbox).
  // Preview: Paul's Gmail. Before launch: a key created for lab@progressivedental.ca.
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
};

export const nav = [
  { href: '', label: 'Welcome' },
  { href: 'our-successes.html', label: 'Our Successes' },
  { href: 'products--services.html', label: 'Products & Services' },
  { href: 'our-team.html', label: 'Our Team' },
  { href: 'our-new-offices.html', label: 'Our New Offices' },
  { href: 'contact-us.html', label: 'Contact Us' },
];

/** Prefix a site path with the deploy base (GitHub Pages subfolder or /). */
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
