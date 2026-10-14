/* ==========================================================================
   SKIN SCIENCE CENTER — SITE CONFIG
   --------------------------------------------------------------------------
   This is the ONE file the clinic edits for everyday changes:
   phone, WhatsApp, address, timings, prices, offers, reviews, social links.

   Anything set to null or containing "[EDIT]" shows on the site as a small
   gold "EDIT" tag so nothing unverified is presented as fact.
   Set `showEditMarkers: false` once every placeholder has been filled.
   ========================================================================== */

window.SITE_CONFIG = {
  showEditMarkers: true,

  clinic: {
    name: "Skin Science Center",
    doctor: "Dr. Niyati Parikh",
    credentials: "MBBS, MD, DNB (Dermatology, Venereology & Leprology), MNAMS",
    area: "Memnagar, Ahmedabad, Gujarat, India",
    addressLine: "220, Yash Arian Complex, Swami Vivekanand Circle, Chowk, Memnagar, Ahmedabad, Gujarat 380052",
    phone: "+91 81412 68678",
    phoneHref: "+918141268678",
    whatsapp: null,           // [EDIT] digits only incl. country code, e.g. "918141268678" — confirm the WhatsApp number
    email: null,              // e.g. "hello@skinsciencecenter.in" [EDIT]
    mapQuery: "Skin Science Center, 220 Yash Arian Complex, Memnagar, Ahmedabad 380052",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Skin+Science+Center+Memnagar+Ahmedabad",
    parking: "[EDIT] Parking details (e.g. two-wheeler & car parking available in the complex)",
    partner: "In partnership with Shivpoojan Skin & Laser Clinic (Dr. Poojan Parikh)"
  },

  // Clinic timings
  timings: [
    { days: "Monday – Saturday", hours: "10:00 AM – 6:00 PM" },
    { days: "Sunday",            hours: "Closed" }
  ],

  // Booking & newsletter. If an endpoint is set (e.g. Formspree, Google Apps Script),
  // the form POSTs there (photo uploads included). If null, booking falls back to a
  // pre-filled WhatsApp message.
  booking: {
    formEndpoint: null,       // [EDIT] e.g. "https://formspree.io/f/xxxxxxx"
    newsletterEndpoint: null, // [EDIT]
    timeSlots: ["10 – 11 AM", "11 – 12 PM", "12 – 1 PM", "1 – 2 PM", "2 – 3 PM", "3 – 4 PM", "4 – 5 PM", "5 – 6 PM"]
  },

  announcement: {
    enabled: true,
    text: "Bridal Glow & Laser Hair Reduction packages now open for the wedding season.",
    linkText: "View packages",
    link: "#offers"
  },

  social: {
    instagram: "https://www.instagram.com/skinsciencecenter/",
    instagramHandle: "@skinsciencecenter",
    facebook: null,   // [EDIT]
    youtube: null,    // [EDIT]
    linkedin: null    // [EDIT]
  },

  reviews: {
    justdialCount: "135+",
    justdialRating: null,     // e.g. "4.9"  [EDIT]
    justdialUrl: null,        // [EDIT] link to Justdial listing
    googleRating: null,       // [EDIT]
    googleCount: null,        // [EDIT]
    googleUrl: "https://www.google.com/maps/search/?api=1&query=Skin+Science+Center+Memnagar+Ahmedabad",
    videoTestimonialUrl: null,// [EDIT] YouTube embed URL with patient consent
    // REAL Google reviews, verbatim (spacing tidied only). Add more the same way.
    items: [
      { name: "Parmar Virendrasinh", source: "Google", rating: 5,
        text: "Dr. Niyati Parikh is an excellent dermatologist very knowledgeable, patient, and professional. She explained everything clearly and provided personalized treatment. Really happy with the experience and would definitely recommend her for skin and hair concerns." },
      { name: "Namrata Hiranandani", source: "Google", rating: 5,
        text: "Loved my experience with Dr. Niyati. The laser sessions were super effective for my skin tone and concerns, and the HydraFacials.. Instant glow every time. Dr. Niyati is attentive, knowledgeable, and makes you feel completely at ease throughout the process. Highly recommend for anyone looking to invest in real skin care! So glad I trusted them with my skin journey." },
      { name: "Rujuta", source: "Google", rating: 5,
        text: "I have been visiting Dr. Niyati from the past 6 months now and I have seen tremendous difference in my skin. I started consulting her as I am getting married and my skin has never looked so smooth and clean before!! On top of it she is extremely polite, understands your concerns properly and suggests treatment accordingly. It is always a delight to meet her! Hands down the best dermatologist in Ahmedabad! Highly recommended!" },
      { name: "Naman Mehta", source: "Google", rating: 5,
        text: "The doctor is very patient and knowledgeable! She heard about my skin problems in detail providing her inputs and tried to solve the root of the problems. It's working." },
      { name: "Denisha Parmar", source: "Google", rating: 5,
        text: "Dr Niyati Mam is genuinely one of the best dermatologists I have come across. She understands the case so well that u will see results in few days. Strongly recommend her for any skin-related issues. Dr. Niyati's way of treatment which not only cure your skin problem but let you know the ways to prevent it. Clinic is comfortable and relaxing 😊 staff member is friendly, knowledgeable, and Helpful. Im very happy with the results of my treatment. Thank you Dr Niyati Mam for make me happy 😊🙏🏻" },
      { name: "Nilesh Dekivadiya", source: "Google", rating: 5,
        text: "I've been extremely impressed by the way the staff at SKIN SCIENCE clinic have looked after me. Particularly Dr. Niyati Parikh who has been extremely helpful and thorough in the way she's dealt with me. The products she advised me to start using have had a massive impact on my skin, hugely improving the appearance of scarring and have also reduced congestion. In addition to this she has also made me feel both extremely comfortable and safe throughout our sessions. Would highly recommend SKIN SCIENCE clinic to all." },
      { name: "Yesha Patel", source: "Google", rating: 5,
        text: "I had a great experience with my laser hair reduction treatment at this clinic." }
    ]
  },

  // Consultation fees — [EDIT]
  consultation: {
    inClinic: null,  // e.g. 800
    video: null,     // e.g. 700
    followUp: null,  // e.g. "Free within 7 days"
    note: "Consultation fee is adjusted against treatment in some cases. [EDIT confirm policy]"
  },

  // Starting prices in ₹ keyed by service id (see content.js). null = shows [EDIT].
  prices: {
    acne: null, eczema: null, psoriasis: null, fungal: null, vitiligo: null,
    urticaria: null, warts: null, std: null, leprosy: null,
    hairfall: null, prp: null, dandruff: null, alopecia: null,
    botox: null, fillers: null, threadlift: null, boosters: null,
    lhr: null, pigmentlaser: null, scarlaser: null,
    peels: null, hydrafacial: null, microderm: null, dermabrasion: null,
    microneedling: null, mnrf: null, carbonpeel: null,
    skintag: null, mole: null, wartremoval: null, keloid: null
  },

  // Offers / packages — all details [EDIT] by clinic
  offers: [
    {
      id: "bridal",
      tag: "Most loved",
      name: "Bridal Glow Programme",
      duration: "[EDIT] 8–12 weeks before the wedding",
      includes: ["Dermatologist skin assessment", "[EDIT] Medi-facials / HydraFacial sessions", "[EDIT] Peels for even tone", "Personalised home-care plan"],
      price: null
    },
    {
      id: "lhr-face",
      tag: "Laser",
      name: "Laser Hair Reduction — Face",
      duration: "[EDIT] Package of 6 sessions",
      includes: ["Patch test & skin-type assessment", "[EDIT] Upper lip, chin & sides", "Cooling & aftercare"],
      price: null
    },
    {
      id: "lhr-body",
      tag: "Laser",
      name: "Laser Hair Reduction — Full Body",
      duration: "[EDIT] Package of 6–8 sessions",
      includes: ["Patch test & skin-type assessment", "[EDIT] Areas included", "Session tracking & reviews"],
      price: null
    }
  ],

  // Pre/post care guides (printable → Save as PDF). Replace with real PDFs if available.
  careGuides: [
    { name: "Before your laser session", href: "care-guides.html#laser-before" },
    { name: "After your chemical peel",  href: "care-guides.html#peel-after" },
    { name: "After PRP / GFC therapy",   href: "care-guides.html#prp-after" },
    { name: "After fillers & anti-wrinkle injections", href: "care-guides.html#injectables-after" }
  ],

  // Real clinic photos live in assets/img. Remaining Unsplash images are placeholders for articles.
  images: {
    doctor: "assets/img/doctor/dr-niyati-parikh.webp",
    doctorClinic: "assets/img/doctor/dr-niyati-parikh-clinic.webp",
    heroVideo: null, // optional mp4 URL
    clinic: [
      { src: "assets/img/clinic/reception-2.webp", title: "Reception", text: "A calm, private welcome" },
      { src: "assets/img/clinic/treatment-room.webp", title: "Laser & procedure room", text: "Medical-grade devices and hygiene" },
      { src: "assets/img/clinic/consultation-room.webp", title: "Consultation room", text: "Unhurried, one-to-one consultations" },
      { src: "assets/img/clinic/reception.webp", title: "Waiting lounge", text: "Comfortable and relaxing" }
    ],
    // Patient results — shared with consent. Do not add photos without written consent.
    results: [
      { title: "Active acne", tag: "Acne", before: "assets/img/results/acne-before.webp", after: "assets/img/results/acne-after.webp" },
      { title: "Neck pigmentation", tag: "Pigmentation", before: "assets/img/results/neck-1-before.jpg", after: "assets/img/results/neck-1-after.jpg" },
      { title: "Neck darkening", tag: "Pigmentation", before: "assets/img/results/neck-2-before.jpg", after: "assets/img/results/neck-2-after.jpg" },
      { title: "Skin growth removal", tag: "Minor procedure", before: "assets/img/results/growth-before.jpg", after: "assets/img/results/growth-after.jpg" }
    ],
    // Stock placeholders (Unsplash) used for journal articles
    peel: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    lab: "https://images.unsplash.com/photo-1527613426441-4da17471b66d",
    serum: "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
  }
};
