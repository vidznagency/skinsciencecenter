/* ==========================================================================
   SITE CONTENT — treatments, journal, FAQs, myths.
   General patient-education copy. Have Dr. Niyati Parikh review clinical
   wording before going live. Prices live in config.js, not here.
   ========================================================================== */

window.SITE_CONTENT = {
  categories: [
    { id: "medical",  name: "Medical Dermatology",   icon: "shield" },
    { id: "hair",     name: "Hair & Scalp",          icon: "hair" },
    { id: "aesthetic",name: "Aesthetic & Anti-Aging",icon: "spark" },
    { id: "laser",    name: "Laser & Energy-Based",  icon: "laser" },
    { id: "rejuv",    name: "Skin Rejuvenation",     icon: "drop" },
    { id: "minor",    name: "Minor Procedures",      icon: "scalpel" }
  ],

  categoryFaqs: {
    medical: [["Do I need a referral?", "No. You can book a consultation directly. Bring any previous prescriptions and reports."]],
    hair: [["Should I get blood tests?", "Often, yes. Thyroid, iron and vitamin levels commonly affect hair. The doctor will advise which tests are relevant for you."]],
    aesthetic: [["Will I look ‘done’?", "The aim is a natural, rested look. Doses and placement are planned conservatively and reviewed at follow-up."]],
    laser: [["Is laser safe for Indian skin?", "When the correct device and settings are chosen for your skin type, laser treatments can be used safely on Indian skin. A patch test is done first."]],
    rejuv: [["Can I combine treatments?", "Yes, many rejuvenation treatments are combined in a staged plan. The doctor will sequence them to avoid irritation."]],
    minor: [["Is it done the same day?", "Most minor procedures can be done on the day of consultation under local anaesthesia, if suitable."]]
  },

  services: [
    // ---------- MEDICAL ----------
    { id: "acne", cat: "medical", name: "Acne Treatment",
      short: "Medical management of whiteheads, pimples and cystic acne — clearing skin while preventing scars.",
      steps: ["Grade your acne and identify triggers", "Prescription plan, plus in-clinic peels or extraction if needed", "Maintenance routine to prevent relapse"],
      sessions: "Ongoing plan, reviews every 4–6 weeks", downtime: "None (medication); minimal for peels", results: "Visible improvement in 6–12 weeks",
      suits: "Teens and adults with facial, back or hormonal acne",
      faqs: [["Will my acne come back?", "Acne is a chronic condition, but a good maintenance plan keeps most people clear long-term."], ["Do I need oral medicines?", "Only if your acne grade needs it. Many patients do well on topical treatment alone."]] },
    { id: "eczema", cat: "medical", name: "Eczema & Dermatitis",
      short: "Relief from itchy, dry, inflamed skin with a plan that repairs the skin barrier.",
      steps: ["Identify type and triggers (allergic, contact, atopic)", "Calm flare-ups with targeted medication", "Barrier-repair routine to prevent recurrence"],
      sessions: "Follow-ups as needed", downtime: "None", results: "Itch relief within days; control over weeks",
      suits: "Children and adults with recurrent rashes or itchy, dry patches",
      faqs: [["Is eczema contagious?", "No. Eczema cannot spread from person to person."], ["Can patch testing help?", "Yes, for suspected contact allergy, patch testing can identify the cause."]] },
    { id: "psoriasis", cat: "medical", name: "Psoriasis Care",
      short: "Long-term control of scaly plaques on the skin, scalp and nails using evidence-based therapy.",
      steps: ["Assess extent, type and joint involvement", "Topical, oral or phototherapy-based plan", "Regular reviews to keep it in remission"],
      sessions: "Long-term follow-up", downtime: "None", results: "Improvement typically within 4–8 weeks",
      suits: "Anyone with psoriasis, including scalp and nail psoriasis",
      faqs: [["Can psoriasis be cured?", "It is a chronic condition, but modern treatment can keep skin clear for long periods."], ["Is it related to diet or stress?", "Stress, infections and some medicines can trigger flares. The doctor will help you identify yours."]] },
    { id: "fungal", cat: "medical", name: "Fungal Infections",
      short: "Effective treatment for ringworm (tinea), intertrigo and other fungal infections common in humid weather.",
      steps: ["Confirm diagnosis (clinically or with a scraping test)", "Right antifungal for the right duration", "Prevention tips to stop re-infection at home"],
      sessions: "1–3 follow-ups", downtime: "None", results: "Itch relief within 1–2 weeks; full course 4–8 weeks",
      suits: "Itchy, ring-shaped or spreading rashes, especially in folds",
      faqs: [["Why does my ringworm keep coming back?", "Incomplete courses, steroid creams and shared towels/clothes are common reasons. Finishing the full course matters."], ["Should I use over-the-counter creams?", "Avoid mixed steroid creams — they can make fungal infections worse and harder to treat."]] },
    { id: "vitiligo", cat: "medical", name: "Vitiligo",
      short: "Treatment to stop the spread of white patches and help restore pigment.",
      steps: ["Assess stability and extent", "Medical therapy and/or phototherapy", "Surgical options for stable patches, if suitable"],
      sessions: "Long-term plan with regular reviews", downtime: "Minimal", results: "Repigmentation over months",
      suits: "Children and adults with white patches",
      faqs: [["Is vitiligo contagious?", "No. It cannot spread by touch or food."], ["Can it be treated?", "Many patients see good repigmentation, especially when treated early."]] },
    { id: "urticaria", cat: "medical", name: "Urticaria (Hives)",
      short: "Diagnosis and control of recurring itchy wheals and allergic skin swelling.",
      steps: ["History and tests to look for triggers", "Step-wise antihistamine-based treatment", "Gradual tapering once controlled"],
      sessions: "Follow-ups every few weeks", downtime: "None", results: "Symptom control usually within days",
      suits: "Anyone with hives lasting days, weeks or recurring for months",
      faqs: [["Is it a food allergy?", "Sometimes, but most chronic urticaria is not caused by food. The doctor will guide which tests are useful."], ["When is it an emergency?", "Swelling of lips or tongue, or difficulty breathing needs emergency care immediately."]] },
    { id: "warts", cat: "medical", name: "Warts & Molluscum",
      short: "Medical and procedural treatment for viral warts on hands, feet, face and body.",
      steps: ["Identify type and number of lesions", "Topical therapy, cautery or cryotherapy", "Review to catch new lesions early"],
      sessions: "1–4 sessions", downtime: "Minimal; small scabs for a few days", results: "Clearance over 2–8 weeks",
      suits: "Common, plantar, flat and facial warts; molluscum",
      faqs: [["Can warts spread?", "Yes, they are caused by a virus and can spread on your body or to others."], ["Will they leave a scar?", "With correct technique, scarring is uncommon."]] },
    { id: "std", cat: "medical", name: "STD / Venereology",
      short: "Confidential, non-judgemental diagnosis and treatment of sexually transmitted infections.",
      steps: ["Private consultation and examination", "Tests where needed", "Treatment, partner advice and follow-up"],
      sessions: "As advised", downtime: "None", results: "Depends on the infection",
      suits: "Anyone with genital symptoms or concerns after exposure",
      faqs: [["Is my visit confidential?", "Yes. Your consultation and records are strictly private."], ["Should my partner be treated?", "Often yes, to prevent re-infection. The doctor will advise."]] },
    { id: "leprosy", cat: "medical", name: "Leprosy Care",
      short: "Early diagnosis and complete treatment of leprosy (Hansen's disease), with care to prevent disability.",
      steps: ["Clinical examination and tests", "Multi-drug therapy as per guidelines", "Monitoring for reactions and nerve care"],
      sessions: "6–12 month course", downtime: "None", results: "Curable with complete treatment",
      suits: "Anyone with numb, light-coloured patches or nerve symptoms",
      faqs: [["Is leprosy curable?", "Yes. It is fully curable with multi-drug therapy."], ["Is it easily contagious?", "No. Once treatment begins, the risk of spread drops rapidly."]] },

    // ---------- HAIR ----------
    { id: "hairfall", cat: "hair", name: "Hair-Fall Treatment",
      short: "Finding the real cause of hair fall and treating it — not just the symptom.",
      steps: ["Scalp exam, trichoscopy and relevant blood tests", "Medical treatment and nutrition correction", "Add-on in-clinic therapies if needed"],
      sessions: "Reviews every 6–8 weeks", downtime: "None", results: "Reduced shedding in 2–3 months",
      suits: "Men and women with excess shedding or thinning",
      faqs: [["Is losing hair every day normal?", "Losing up to about 100 strands a day can be normal. More, or visible thinning, should be checked."], ["Does stress cause hair fall?", "Yes, it can trigger shedding (telogen effluvium) a few months later."]] },
    { id: "prp", cat: "hair", name: "PRP / GFC Therapy",
      short: "Growth factors from your own blood, delivered to the scalp to support hair growth.",
      steps: ["A small blood sample is taken", "Platelet-rich plasma / growth factor concentrate is prepared", "Injected into the scalp after numbing"],
      sessions: "Typically 4–6 sessions, 4 weeks apart", downtime: "Minimal; mild tenderness for a day", results: "Visible change in 3–4 months",
      suits: "Early pattern hair loss and thinning, alongside medical treatment",
      faqs: [["Is PRP painful?", "Numbing is used, so most patients find it very tolerable."], ["Is it a replacement for medicines?", "No. PRP works best as an add-on to a medical plan."]] },
    { id: "dandruff", cat: "hair", name: "Dandruff & Seborrheic Dermatitis",
      short: "Control of flaking, itching and oily scalp with the right medicated routine.",
      steps: ["Rule out psoriasis or fungal infection", "Medicated shampoos and topical therapy", "Maintenance routine"],
      sessions: "1–2 follow-ups", downtime: "None", results: "Relief within 2–4 weeks",
      suits: "Persistent flaking, itch or redness on the scalp, eyebrows or face",
      faqs: [["Why does dandruff keep coming back?", "It is a recurring condition; a weekly maintenance shampoo keeps it controlled."], ["Does oiling help?", "Heavy oiling can sometimes worsen seborrheic dermatitis."]] },
    { id: "alopecia", cat: "hair", name: "Alopecia (Patchy & Pattern)",
      short: "Treatment for alopecia areata patches and androgenetic (pattern) hair loss.",
      steps: ["Diagnose type with trichoscopy", "Medical therapy, injections or topical treatment", "Track regrowth with photos"],
      sessions: "Monthly reviews", downtime: "None to minimal", results: "Regrowth often starts in 2–3 months",
      suits: "Round bald patches, widening parting or receding hairline",
      faqs: [["Will the hair grow back?", "In alopecia areata, regrowth is common with treatment. Pattern loss is slowed and partly reversed."], ["Is it genetic?", "Pattern hair loss has a strong genetic component."]] },

    // ---------- AESTHETIC ----------
    { id: "botox", cat: "aesthetic", name: "Anti-Wrinkle Injections (Botox)",
      short: "Softens expression lines on the forehead, frown area and around the eyes.",
      steps: ["Facial assessment of muscle movement", "Precise micro-injections", "Review at 2 weeks for fine-tuning"],
      sessions: "1 session; repeated every 4–6 months", downtime: "None", results: "Visible in 3–7 days, full at 2 weeks",
      suits: "Adults with dynamic lines, or for prevention",
      faqs: [["Will my face look frozen?", "Not with a conservative, well-placed dose. Natural expression is the goal."], ["Is it safe?", "When performed by a trained doctor using approved products, it has a long safety record."]] },
    { id: "fillers", cat: "aesthetic", name: "Restylane® Dermal Fillers",
      short: "Hyaluronic acid fillers to restore volume, define contours and soften folds — natural and reversible.",
      steps: ["Facial-harmony assessment", "Precise filler placement with cannula or needle", "Follow-up review and touch-up if needed"],
      sessions: "Usually 1 session", downtime: "Mild swelling 1–3 days", results: "Immediate; lasts many months depending on area",
      suits: "Under-eye hollows, cheeks, lips, jawline, chin, nasolabial folds",
      faqs: [["Are fillers reversible?", "Hyaluronic acid fillers can be dissolved if ever needed."], ["How long do they last?", "Depending on the area and product, results commonly last 6–18 months."]] },
    { id: "threadlift", cat: "aesthetic", name: "Thread Lift",
      short: "Dissolvable threads that lift and tighten mild sagging without surgery.",
      steps: ["Assess laxity and plan vectors", "Threads placed under local anaesthesia", "Collagen builds as threads dissolve"],
      sessions: "1 session", downtime: "2–5 days of mild swelling", results: "Immediate lift; improves over 2–3 months",
      suits: "Early jowls, mild cheek and neck laxity",
      faqs: [["Is it surgery?", "No. It is a minimally invasive, in-clinic procedure."], ["How long does it last?", "Results commonly last around 12–18 months."]] },
    { id: "boosters", cat: "aesthetic", name: "Skin Boosters",
      short: "Micro-injections of hyaluronic acid for deep hydration, glow and fine-line improvement.",
      steps: ["Skin quality assessment", "Micro-droplet injections across the face", "Repeat to build results"],
      sessions: "2–3 sessions, 3–4 weeks apart", downtime: "Small bumps for 24–48 hours", results: "Glow within 2 weeks",
      suits: "Dull, dehydrated or crepey skin; pre-event glow",
      faqs: [["Is it a filler?", "It uses hyaluronic acid but spreads thinly for hydration rather than volume."], ["When should I do it before an event?", "Ideally 3–4 weeks before."]] },

    // ---------- LASER ----------
    { id: "lhr", cat: "laser", name: "Laser Hair Reduction",
      short: "Long-term reduction of unwanted hair on the face and body using medical-grade laser.",
      steps: ["Patch test and skin/hair assessment", "Laser sessions with built-in cooling", "Maintenance sessions as needed"],
      sessions: "6–8 sessions, 4–8 weeks apart", downtime: "None; mild redness for a few hours", results: "Noticeable reduction after 3–4 sessions",
      suits: "Dark hair on most skin types; PCOS-related facial hair",
      faqs: [["Is it permanent?", "It gives long-term reduction; occasional maintenance sessions may be needed."], ["Does it hurt?", "Most people describe a quick snap sensation; cooling keeps it comfortable."]] },
    { id: "pigmentlaser", cat: "laser", name: "Pigmentation Laser",
      short: "Targeted laser for sun spots, freckles, melasma (in select cases) and uneven tone.",
      steps: ["Diagnose type and depth of pigmentation", "Laser at settings matched to your skin", "Strict sun protection and maintenance"],
      sessions: "3–6 sessions", downtime: "Mild redness or darkening of spots for a few days", results: "Gradual lightening over sessions",
      suits: "Sun spots, freckles, tanning, uneven tone",
      faqs: [["Can laser cure melasma?", "Melasma can be improved but needs a combined, long-term approach — laser alone is rarely enough."], ["Is sunscreen really necessary?", "Yes, it is essential to maintain results."]] },
    { id: "scarlaser", cat: "laser", name: "Laser Scar Revision",
      short: "Fractional laser to resurface acne scars and other textural scars.",
      steps: ["Grade the scars and plan combination therapy", "Fractional laser sessions", "Skin remodels between sessions"],
      sessions: "3–6 sessions, 4–6 weeks apart", downtime: "2–5 days of redness/flaking", results: "Progressive improvement over months",
      suits: "Acne scars, chickenpox scars, surgical scars",
      faqs: [["Will scars disappear completely?", "The aim is significant improvement; complete removal is rarely possible."], ["Can it be combined?", "Yes — often with subcision, peels or MNRF for best results."]] },

    // ---------- REJUVENATION ----------
    { id: "peels", cat: "rejuv", name: "Chemical Peels",
      short: "Medical-grade peels to treat acne, pigmentation, tan and dullness.",
      steps: ["Choose peel type and strength for your skin", "Controlled application in clinic", "Post-peel care and sun protection"],
      sessions: "4–6 sessions, 2–4 weeks apart", downtime: "None to 3–5 days light flaking", results: "Brighter skin after first session",
      suits: "Acne, pigmentation, tan, dull skin, oily skin",
      faqs: [["Will my skin peel a lot?", "Most modern peels cause only light flaking, if any."], ["Are peels safe for Indian skin?", "Yes, when the right peel and strength are chosen by a dermatologist."]] },
    { id: "hydrafacial", cat: "rejuv", name: "HydraFacial",
      short: "Cleanse, exfoliate, extract and hydrate in one relaxing, no-downtime treatment.",
      steps: ["Deep cleanse and gentle exfoliation", "Painless vortex extraction", "Infusion of hydrating serums"],
      sessions: "Single or monthly", downtime: "None", results: "Instant glow",
      suits: "All skin types; before events; congested skin",
      faqs: [["Is it suitable for sensitive skin?", "Generally yes; serums are customised to your skin."], ["How often should I do it?", "Once a month is a common maintenance schedule."]] },
    { id: "microderm", cat: "rejuv", name: "Microdermabrasion",
      short: "Gentle mechanical exfoliation to refine texture and brighten dull skin.",
      steps: ["Skin cleanse", "Controlled crystal/diamond-tip exfoliation", "Hydration and sun protection"],
      sessions: "4–6 sessions", downtime: "None", results: "Smoother skin immediately",
      suits: "Dullness, mild texture, superficial tan",
      faqs: [["Is it painful?", "No, it feels like a gentle scratchy massage."], ["Can it treat scars?", "Only very superficial texture; deeper scars need other treatments."]] },
    { id: "dermabrasion", cat: "rejuv", name: "Dermabrasion",
      short: "Deeper resurfacing for selected scars and textural irregularities.",
      steps: ["Assessment and test area if needed", "Resurfacing under local anaesthesia", "Wound care while new skin forms"],
      sessions: "Usually 1 session", downtime: "7–10 days", results: "Visible after healing, improves over months",
      suits: "Selected deep scars and texture irregularities",
      faqs: [["How is it different from microdermabrasion?", "Dermabrasion goes much deeper and is a procedure with downtime."], ["Is it suitable for everyone?", "No. The doctor will check your skin type and scar type first."]] },
    { id: "microneedling", cat: "rejuv", name: "Microneedling",
      short: "Controlled micro-channels stimulate collagen for scars, pores and texture.",
      steps: ["Numbing cream applied", "Microneedling with sterile cartridges", "Soothing serum and aftercare"],
      sessions: "4–6 sessions, 4 weeks apart", downtime: "1–2 days redness", results: "Gradual improvement over 3 months",
      suits: "Acne scars, open pores, fine lines",
      faqs: [["Is it the same as a derma roller at home?", "No. Clinic microneedling is sterile, controlled and much more effective."], ["Can it be combined with PRP?", "Yes, it is often combined."]] },
    { id: "mnrf", cat: "rejuv", name: "MNRF (Microneedling Radiofrequency)",
      short: "Microneedling plus radiofrequency energy for scars, pores and skin tightening.",
      steps: ["Numbing and skin prep", "Insulated needles deliver RF energy into the dermis", "Collagen remodelling over weeks"],
      sessions: "3–4 sessions, 4–6 weeks apart", downtime: "2–3 days redness", results: "Progressive over 3–6 months",
      suits: "Acne scars, enlarged pores, early laxity",
      faqs: [["Is MNRF safe for darker skin?", "Yes, it has a lower risk of pigmentation than many lasers when done correctly."], ["How soon will I see results?", "Texture improves after each session, with best results months later."]] },
    { id: "carbonpeel", cat: "rejuv", name: "Carbon Laser Peel",
      short: "Laser ‘hollywood’ peel that deep-cleans pores, controls oil and adds instant glow.",
      steps: ["Carbon lotion applied", "Laser passes over the skin", "Hydration and sunscreen"],
      sessions: "3–5 sessions", downtime: "None", results: "Instant brightness",
      suits: "Oily skin, open pores, dullness, pre-event glow",
      faqs: [["Does it hurt?", "There is a mild warm, tingling sensation."], ["Can I go out after?", "Yes, there is no downtime."]] },

    // ---------- MINOR ----------
    { id: "skintag", cat: "minor", name: "Skin Tag Removal",
      short: "Quick, precise removal of skin tags on the neck, underarms and face.",
      steps: ["Local anaesthesia", "Removal by radiofrequency/cautery", "Simple dressing and aftercare"],
      sessions: "1 session", downtime: "Small scabs for 5–7 days", results: "Immediate",
      suits: "Single or multiple skin tags",
      faqs: [["Will they come back?", "Removed tags don't return, but new ones may form over time."], ["Is it painful?", "Numbing makes it nearly painless."]] },
    { id: "mole", cat: "minor", name: "Mole Removal",
      short: "Safe removal of moles after a dermatologist checks they are benign.",
      steps: ["Dermoscopic examination", "Removal by RF or excision", "Histopathology if needed"],
      sessions: "1 session", downtime: "5–10 days healing", results: "Immediate; scar fades over months",
      suits: "Cosmetic or irritated moles",
      faqs: [["Which moles need checking?", "Moles that change in size, colour or shape, bleed or itch should be checked promptly."], ["Will it leave a mark?", "A small, flat mark may remain and usually fades."]] },
    { id: "wartremoval", cat: "minor", name: "Wart Removal",
      short: "Procedural removal of stubborn warts by cautery, RF or cryotherapy.",
      steps: ["Local anaesthesia where needed", "Removal by chosen method", "Review for recurrence"],
      sessions: "1–3 sessions", downtime: "5–10 days", results: "Immediate for treated warts",
      suits: "Warts not responding to topical treatment",
      faqs: [["Can warts recur?", "Yes, the virus can persist; follow-up helps catch early recurrence."], ["Is it safe on the face?", "Yes, with appropriate technique."]] },
    { id: "keloid", cat: "minor", name: "Keloid & Scar Treatment",
      short: "Flattening and softening of raised keloid and hypertrophic scars.",
      steps: ["Assess scar type and activity", "Intralesional injections ± cryotherapy/laser", "Silicone & pressure care at home"],
      sessions: "Several sessions, 3–4 weeks apart", downtime: "Minimal", results: "Flattening over months",
      suits: "Ear-piercing keloids, chest/shoulder keloids, raised surgical scars",
      faqs: [["Should I get a keloid cut out?", "Surgery alone often leads to recurrence; combination treatment is usually needed."], ["Can keloids be prevented?", "Early treatment of new scars helps if you are keloid-prone."]] }
  ],

  // Skin Concern Finder
  finder: {
    concerns: [
      { id: "acne", label: "Acne & breakouts", recs: ["acne", "peels", "carbonpeel"] },
      { id: "pigment", label: "Pigmentation & tan", recs: ["peels", "pigmentlaser", "hydrafacial"] },
      { id: "hair", label: "Hair fall & thinning", recs: ["hairfall", "prp", "alopecia"] },
      { id: "aging", label: "Fine lines & ageing", recs: ["botox", "fillers", "boosters", "threadlift"] },
      { id: "scars", label: "Acne scars & texture", recs: ["mnrf", "scarlaser", "microneedling"] },
      { id: "unwanted", label: "Unwanted hair", recs: ["lhr"] },
      { id: "dull", label: "Dull, tired skin", recs: ["hydrafacial", "boosters", "peels", "carbonpeel"] },
      { id: "rash", label: "Itch, rash or infection", recs: ["fungal", "eczema", "urticaria", "psoriasis"] },
      { id: "growths", label: "Skin tags, moles, warts", recs: ["skintag", "mole", "wartremoval"] }
    ],
    types: ["Oily", "Dry", "Combination", "Sensitive", "Not sure"],
    goals: [
      { id: "medical", label: "Treat a medical problem properly" },
      { id: "nodowntime", label: "Results with zero downtime" },
      { id: "event", label: "Glow for an event or wedding" },
      { id: "longterm", label: "Long-term, lasting change" }
    ]
  },

  timeline: [
    { step: "MBBS", text: "Medical degree — foundation in clinical medicine." },
    { step: "MD", text: "Doctor of Medicine in Dermatology, Venereology & Leprology." },
    { step: "DNB", text: "Diplomate of National Board — Dermatology, Venereology & Leprology." },
    { step: "MNAMS", text: "Member of the National Academy of Medical Sciences." },
    { step: "Aesthetics", text: "Certified in non-surgical facial aesthetics, including anti-ageing with Restylane fillers." },
    { step: "Zydus Hospitals", text: "Consultant Dermatologist, Zydus Hospitals, Ahmedabad." },
    { step: "Skin Science Center", text: "Founder & owner — Memnagar, Ahmedabad." }
  ],

  whyUs: [
    { title: "Evidence-based care", text: "Every plan starts with a diagnosis, not a sales menu. Treatments are chosen on clinical evidence." },
    { title: "US-FDA-approved technology", text: "Lasers and energy devices are chosen for safety on Indian skin. [EDIT confirm device approvals]" },
    { title: "Personalised plans", text: "Your skin type, lifestyle and budget shape a plan that is yours alone — reviewed as you progress." },
    { title: "Hygiene protocols", text: "Sterile single-use consumables, disinfected rooms and medical-grade protocols for every procedure." }
  ],

  blog: [
    { id: "monsoon-acne", tag: "Acne", read: "4 min", title: "Monsoon acne in Gujarat: why your skin breaks out when it rains",
      img: "peel",
      excerpt: "Humidity, sweat and fungal overgrowth combine every monsoon. Here's how to keep your skin calm.",
      body: [
        "Every monsoon, dermatology clinics across Gujarat see a rise in breakouts. High humidity increases sweat and oil, and pores clog more easily. Warm, damp skin is also a perfect environment for yeast — which is why many ‘monsoon pimples’ on the chest, back and forehead are actually fungal folliculitis, not regular acne.",
        "The difference matters: fungal acne doesn't respond to typical acne creams and can worsen with steroid-mixed creams bought over the counter. Small, uniform, itchy bumps are a clue.",
        "What helps: switch to a gel-based moisturiser, wash after sweating, change out of damp clothes quickly, and keep using a non-comedogenic sunscreen — cloudy days still carry UV. If bumps are itchy, spreading or not improving in two weeks, get them examined."
      ] },
    { id: "prp-worth-it", tag: "Hair", read: "5 min", title: "Is PRP worth it for hair loss? An honest answer",
      img: "lab",
      excerpt: "PRP can help — but only for the right person, as part of the right plan.",
      body: [
        "Platelet-rich plasma (PRP) uses growth factors from your own blood to support hair follicles. Studies show it can improve hair density in androgenetic (pattern) hair loss, especially in early stages.",
        "But PRP is an add-on, not a standalone cure. Hair fall caused by thyroid problems, low iron, crash diets or stress won't be fixed by injections alone — the cause needs treating first. That's why a proper diagnosis with trichoscopy and blood tests comes before any procedure.",
        "Good candidates: early thinning, a widening parting or mild recession, who are also on medical treatment. Expect a series of sessions and give it 3–4 months before judging results."
      ] },
    { id: "sunscreen-myths", tag: "Sun care", read: "3 min", title: "Sunscreen myths dermatologists hear every day",
      img: "serum",
      excerpt: "‘I'm indoors.’ ‘My skin is dark.’ ‘It's cloudy.’ Let's clear these up.",
      body: [
        "Myth: Darker skin doesn't need sunscreen. Fact: Melanin offers some protection, but Indian skin is especially prone to tanning, pigmentation and melasma — sunscreen is one of the best ways to prevent them.",
        "Myth: I'm indoors, so I don't need it. Fact: UVA passes through windows, and visible light from the sun also worsens pigmentation. Near a window? Wear it.",
        "Myth: SPF 50 means I'm protected all day. Fact: Sunscreen needs reapplying every 2–3 hours outdoors, and most people apply far too little. Use about two finger-lengths for the face and neck."
      ] }
  ],

  myths: [
    { myth: "Oily skin doesn't need moisturiser.", fact: "Dehydrated oily skin often produces more oil. A light, gel-based moisturiser helps balance it." },
    { myth: "Toothpaste dries out pimples.", fact: "It irritates skin and can cause burns and dark marks. Use prescribed spot treatments instead." },
    { myth: "Laser hair removal is unsafe for Indian skin.", fact: "With the right device and settings for your skin type, it's a well-established, safe treatment." },
    { myth: "Hair fall means you're going bald.", fact: "Most hair fall is temporary shedding with a treatable cause — thyroid, iron, stress or illness." },
    { myth: "Fillers and Botox are the same thing.", fact: "Botox relaxes muscles to soften lines; fillers restore lost volume. They solve different problems." },
    { myth: "Steroid creams fix every rash.", fact: "Unsupervised steroid creams can worsen fungal infections and thin the skin. Get a diagnosis first." }
  ],

  faqs: {
    "General": [
      ["Do I need an appointment?", "Appointments are recommended so we can give you unhurried time with the doctor. Book online, on WhatsApp or by phone."],
      ["Who will I see?", "Consultations are with Dr. Niyati Parikh, MD, DNB. The clinic works in partnership with Shivpoojan Skin & Laser Clinic (Dr. Poojan Parikh)."],
      ["Do you treat children?", "Yes, paediatric skin conditions such as eczema, warts and infections are treated. [EDIT confirm age policy]"],
      ["Is online consultation available?", "Yes — you can choose a video consultation in the booking form and share photos of your concern in advance."]
    ],
    "Treatments": [
      ["Are treatments safe for Indian skin?", "Treatments and device settings are chosen specifically for your skin type. A patch test is done where relevant."],
      ["How many sessions will I need?", "It varies by condition and treatment. Each treatment page lists typical session counts, and your plan will be personalised."],
      ["Can I combine treatments?", "Often, yes. Combining medical and procedural treatments gives the best results for many conditions."],
      ["Are results guaranteed?", "No ethical doctor can guarantee results. We set realistic expectations at the start and track progress with photos."]
    ],
    "Payments": [
      ["What payment methods do you accept?", "[EDIT] Cash, UPI, cards…"],
      ["Are prices fixed?", "Prices listed are starting prices. Final cost depends on your consultation, the area treated and number of sessions."],
      ["Do you offer packages?", "Yes, see our packages section for bridal and laser hair reduction packages."],
      ["Is EMI available?", "[EDIT] Confirm EMI options."]
    ],
    "First visit": [
      ["What should I bring?", "Previous prescriptions, reports and a list of products you currently use."],
      ["Should I come without makeup?", "Yes, please come with clean skin so the doctor can examine it properly."],
      ["How long does the first visit take?", "Plan for around [EDIT] 20–30 minutes."],
      ["Can I get treatment on the first visit?", "Many treatments can be started the same day, if suitable after assessment."]
    ]
  }
};
