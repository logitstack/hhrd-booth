// ============================================================
// HHRD Booth - Country and Program Data
//
// All 57 countries, 198 program rows. Numbers, descriptions, and
// stories sourced from HHRD's 2024-2025 annual reports, half-yearly
// reports, the ICNA refresh file, and 8 success-story photos.
//
// See SOURCES_AND_DECISIONS.md for full provenance log.
//
// To update content: edit values below, no other code changes needed.
// Countries are sorted by total beneficiaries (descending).
// ============================================================

// Program codes, full names, and brand colors. The Icon names map to
// lucide-react imports in App.jsx; do not rename without updating both.
export const PROGRAMS = {
  OSP:     { name: "Orphan Support Program",                                                    color: "#db2777", iconName: "Heart" },
  ESP:     { name: "Education Support Program",                                                 color: "#2563eb", iconName: "GraduationCap" },
  CWDP:    { name: "Children with Disabilities Program",                                       color: "#7c3aed", iconName: "Accessibility" },
  WASH:    { name: "Water, Sanitation, and Hygiene",                                           color: "#0d9488", iconName: "Droplet" },
  SDLP:    { name: "Skills Development and Livelihood Program",                                color: "#16a34a", iconName: "Sprout" },
  SPR:     { name: "Shelter Relief Program",                                                   color: "#d97706", iconName: "Home" },
  CPRP:    { name: "Comprehensive Physical Rehabilitation Program",                            color: "#9333ea", iconName: "Activity" },
  HANP:    { name: "Healthcare and Nutrition Program",                                         color: "#ea580c", iconName: "Stethoscope" },
  ERDM:    { name: "Emergency Relief and Disaster Management",                                 color: "#dc2626", iconName: "Siren" },
  Qurbani: { name: "Qurbani",                                                                  color: "#65a30d", iconName: "Utensils" },
  "KIND-R":{ name: "Karachi Institute of Neurological Diseases and Rehabilitation",            color: "#be185d", iconName: "Brain" }
};

// Default beneficiary unit per program (used in the country popup metrics).
export const PROGRAM_UNITS = {
  OSP:      "orphans sponsored",
  ESP:      "students supported",
  CWDP:     "children with disabilities",
  WASH:     "people served",
  SDLP:     "people trained",
  SPR:      "beneficiaries",
  CPRP:     "patients",
  HANP:     "patients served",
  ERDM:     "people reached",
  Qurbani:  "meat shares",
  "KIND-R": "patient visits projected"
};

// Aliases used by the search bar for matching common alternative names.
// Add more here if visitors search for variations not yet recognized.

// All 57 countries with full program data.
// Sort order is descending by total beneficiaries.
export const COUNTRY_DATA = [
  {
    name: `Pakistan`,
    lat: 30.3753,
    lon: 69.3451,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "10,300",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. Pakistan hosts HHRD's largest OSP cohort, combining mainland Pakistani orphans with 1,300 children in Kashmir (Azad). Beneficiaries access core services plus HHRD's scouting programs.`,
        story: {
          quote: `Just as a child carries forward the vision and mission of their parents through the tarbiyah and values instilled in them, I aspire to carry forward Helping Hand's vision and mission of serving suffering humanity. Through the noble profession of Physical Therapy Sciences, I want to dedicate my life to serving the underprivileged and bringing ease and dignity to those in need.`,
          attribution: `Dr. Aqsa Gul, former HHRD Orphan Support beneficiary, Doctorate in Physical Therapy`
        }
      },
      {
        code: "ESP",
        beneficiaries: "349,078",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Pakistan, HHRD's ESP delivers re-registration of out-of-school children, leadership camps, professional internships, teacher training, and school infrastructure including solar installations. Recent 2025 activity included 315 out-of-school children re-registered, 110 leadership scholars, 58 higher-ed degree completions, 27 professional internships, and 94 teachers trained.`,
        story: null
      },
      {
        code: "CWDP",
        beneficiaries: "1,800",
        cumulative: false,
        description: `HHRD's Children with Disabilities Program sponsors children with disabilities up to age 18 with physical therapy, assistive devices, ambulance referrals, and family support. In Pakistan, HHRD's CWDP serves children with disabilities through ambulance referrals (17,168 in H1 2025), assistive devices, and family support, coordinated with CPRP rehabilitation centers.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "177,818",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Pakistan, where over 80% of the population lacks reliable access to safe drinking water, HHRD installed 117 solar-based drinking water systems, 333 community hand pumps, and SCADA-controlled RO plants serving universities in 2025.`,
        story: {
          quote: `HHRD's solar-based water systems and SCADA-controlled RO plants serve thousands of students at universities including Islamia University Bahawalpur, providing clean water on campuses across Pakistan.`,
          attribution: `Students at Islamia University Bahawalpur`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "6,559",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Pakistan, HHRD operates SDLP training centers offering sewing, embroidery, tailoring, beautician courses, and tech skills, paired with toolkit graduation packages.`,
        story: null
      },
      {
        code: "SPR",
        beneficiaries: "51,673",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Pakistan, HHRD builds homes for flood-displaced families and operates SPR Model Villages with full housing, water, sanitation, and community infrastructure.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "114,821",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. HHRD operates 9 Comprehensive Physical Rehabilitation Centers across Pakistan with 4 new centers opened in 2025 (Talagang, Quetta, Muzaffarabad, Lakki Marwat). First-half 2025: 24,196 physical therapy, 7,715 pediatric therapy, 7,349 speech therapy, 7,125 psychotherapy, and 4,116 occupational therapy beneficiaries, plus on-site manufacture of prosthetics and orthotics in Mansehra and Chakwal.`,
        story: {
          quote: `Born with Cerebral Palsy, Razia could not walk, sit, or stand independently. Through HHRD's CPRP she received regular physiotherapy, individualized care plans, and speech therapy. Today she performs 99% of her daily activities independently and speaks with nearly 50% improvement.`,
          attribution: `Razia, CPRP beneficiary`
        }
      },
      {
        code: "HANP",
        beneficiaries: "271,870",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. Pakistan hosts HHRD's largest HANP operation: 13 integrated health clinics, 4 mobile medical units (Rajanpur, Mirpur Khas, Jaffarabad, Gwadar), a NICU at Civil Hospital Mithi (Tharparkar, since 2015), the SGH North Karachi ultrasound facility, dialysis at DHQ Lakki Marwat, and the Border Aid Nexus emergency medical camps in Azad Jammu and Kashmir after the May 2025 Line of Control conflict.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "238,207",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. Pakistan was HHRD's second-largest 2025 emergency response with 25 projects spanning flood relief across multiple provinces (including the Upper Chitral Glacial Lake Outburst Flood), the Border Aid Nexus Project after the May 2025 India-Pakistan conflict (2,639 served), and the Seeds of Hope agricultural recovery supporting 1,100 farmers. Long-term support for Kashmiri refugees in District Bagh continued with 47 university scholarships, 145 skills trainees, and 1,204 patients across 9 medical camps.`,
        story: null
      },
      {
        code: "KIND-R",
        beneficiaries: "60,000",
        cumulative: false,
        description: `Karachi Institute of Neurological Diseases and Rehabilitation (KIND-R) is HHRD's 42,000 sq ft purpose-built neurological hospital in Karachi, the first specialized inpatient neuro-rehabilitation facility in Pakistan. Services launched December 16, 2025; the hospital is projected to serve approximately 65,000 patient visits in 2026, with stroke, autism, and chronic neurological clinics, prosthetics and orthotics, and in-house lab and pharmacy expanding through the first full year.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "3,362",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Pakistan, HHRD distributed 3,362 Qurbani shares for 1446 AH (2025) through Helping Hand Pakistan, including 190 shares in Kashmir (Azad). One of HHRD's largest country-level Qurbani operations.`,
        story: null
      },
    ]
  },
  {
    name: `Palestine - Gaza`,
    lat: 31.5017,
    lon: 34.4668,
    aliases: ["Gaza", "Palestine"],
    programs: [
      {
        code: "WASH",
        beneficiaries: "18,350",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Gaza, HHRD delivered emergency water and hygiene supplies to displaced families during the ongoing crisis, working alongside the ERDM Benevolent Kitchen.`,
        story: {
          quote: `Today, we will wash the exhaustion off our faces.`,
          attribution: `Two sisters receiving HHRD hygiene kits, Gaza`
        }
      },
      {
        code: "SPR",
        beneficiaries: "12,518",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Gaza, HHRD's SPR has provided emergency shelter and home repair support to displaced families across years of conflict.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "20,310",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Gaza, HHRD delivered emergency medications to hospitals during the ongoing war despite frequent airstrikes, electricity shortages, and infrastructure damage. The first shipment arrived at Al-Ahli Hospital on March 27, 2025; the second was redirected to Al-Nasser Hospital in southern Gaza after Al-Ahli was targeted.`,
        story: {
          quote: `HHRD delivered medical supplies, equipment, and medication to Al-Nasser Hospital, Al-Aqsa Martyrs Hospital, Yaffa Hospital, and IDP camps throughout Gaza despite the ongoing war.`,
          attribution: `HANP medical deliveries across Gaza hospitals`
        }
      },
      {
        code: "ERDM",
        beneficiaries: "413,685",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Gaza, HHRD's Benevolent Kitchen serves approximately 413,685 beneficiaries with hot meals cooked and distributed 5 days a week, sourced from within the Gaza strip. Operating in Deir Balah locations including Shuhada Al-Aqsa Hospital, Tyba Camp, North Camp, Al-Wesam Camp, and Al-Nahda Camp.`,
        story: {
          quote: `These meals are more than food. They remind us that we are not alone. May Allah bless everyone who made this possible.`,
          attribution: `Beneficiary at Al-Aqsa Hospital, Gaza`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "4,000",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Gaza, HHRD distributed 4,000 Qurbani shares for 1446 AH (2025) through Mixer Group for Sustainable Development and Integrated Consulting, providing Eid al-Adha meat to families enduring ongoing war.`,
        story: null
      },
    ]
  },
  {
    name: `Bangladesh`,
    lat: 23.685,
    lon: 90.3563,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "750",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Bangladesh, HHRD's OSP serves local Bangladeshi orphans alongside Rohingya refugee children in Cox's Bazar, where refugee orphans access HHRD-run learning centers supplementing limited camp schooling.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "1,950",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Bangladesh, HHRD operates learning centers in Cox's Bazar camps serving Rohingya refugee children with education and psychosocial support where formal schooling is otherwise unavailable.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "270",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Bangladesh, HHRD operates SDLP centers serving Rohingya refugee women and host community Bangladeshis with sewing, embroidery, and food production training.`,
        story: null
      },
      {
        code: "SPR",
        beneficiaries: "37,932",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Bangladesh, HHRD's SPR builds and repairs shelters in Cox's Bazar Rohingya refugee camps where temporary structures wear down quickly in monsoon and heat.`,
        story: {
          quote: `We are very grateful to HHRD for giving us this shelter. Now we live in peace without fear of heat or rain. May Allah bless HHRD for their kindness.`,
          attribution: `Nur Ahmed, age 73, Camp-13`
        }
      },
      {
        code: "CPRP",
        beneficiaries: "698",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Bangladesh, HHRD's CPRP delivers physical rehabilitation to Rohingya refugees and local Bangladeshis. First-half 2025: 145 wheelchairs distributed (65 to Rohingya refugees, 80 to Bangladeshi locals) plus ongoing physical therapy at refugee camps.`,
        story: {
          quote: `Kulsuma, 17, presented with right-sided muscle weakness, mild limb atrophy, and poliomyelitis complications contracted in early childhood. She was enrolled in regular physical therapy and received a wheelchair, which drastically improved her independence and quality of life.`,
          attribution: `Kulsuma, age 17, Camp-15`
        }
      },
      {
        code: "HANP",
        beneficiaries: "279,307",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Bangladesh, HHRD serves Rohingya refugees and local Bangladeshis in Cox's Bazar amid sharply declining international aid. First-half 2025: 89,270 Rohingya plus 16,005 host community plus 8,776 at the Abdul Karim Sarker Community Center, delivered through 3 health camps, a Diagnostic Center, a Mobile Dental Clinic across 6 camps, and a Camp 16 dermatology facility.`,
        story: {
          quote: `I am deeply thankful for the free ultrasound.`,
          attribution: `Noor Kaida, age 23, Cox's Bazar refugee camp`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "2,155",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Bangladesh, HHRD distributed 2,155 Qurbani shares for 1446 AH (2025), serving Rohingya refugees in Cox's Bazar camps alongside host community Bangladeshis.`,
        story: null
      },
    ]
  },
  {
    name: `Kenya`,
    lat: -0.0236,
    lon: 37.9062,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "2,200",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Kenya, HHRD's OSP serves 2,200 orphans including the Africa-wide sanitary napkin program that addresses the 7-to-10 day monthly absence pattern girls face, and adapts to Kenya's 2024 education system overhaul.`,
        story: {
          quote: `I'm happy for your support and making us feel cared for like other children. Whatever we get from Helping Hand is what we share in our family.`,
          attribution: `Farah Mahamed, lost his father in 2019`
        }
      },
      {
        code: "CWDP",
        beneficiaries: "200",
        cumulative: false,
        description: `HHRD's Children with Disabilities Program sponsors children with disabilities up to age 18 with physical therapy, assistive devices, ambulance referrals, and family support. In Kenya, HHRD's CWDP serves children with disabilities including specialty wheelchair fittings for cerebral palsy cases coordinated through the CPRP Wheelchair Distribution Program.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "200,292",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Kenya, HHRD drills and rehabilitates wells in arid counties like Bungoma, reducing the time girls spend fetching water and lifting school attendance.`,
        story: {
          quote: `Now I can go to school and still have time to play. The well is more than just a water source. It is a foundation for better health, education, and hope.`,
          attribution: `Hassan, Bungoma`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "822",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Kenya, HHRD's SDLP trains women in tailoring, hair and beauty services, and food production, paired with microbusiness mentorship.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "161",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Kenya, HHRD distributed 105 wheelchairs in the first half of 2025 including 5 specially configured for children with cerebral palsy.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "55,812",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Kenya, HHRD combines a Basic Health Unit in Malindi (Kilifi County, licensed 2024) with a Mobile Medical Unit launched in 2024 reaching underserved rural communities. First-half 2025: 2,820 BHU patients, 4,409 MMU patients, plus 920 cataract surgeries serving local Kenyans alongside Ethiopian, South Sudanese, Congolese, and Somali refugees.`,
        story: {
          quote: `Safari Kitsao endured chronic ulcers for years. The arrival of HHRD's Mobile Medical Unit in remote Kakoneni Village was an immense relief.`,
          attribution: `Safari Kitsao, Kakoneni Village`
        }
      },
      {
        code: "ERDM",
        beneficiaries: "19,430",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Kenya, HHRD combined drought relief in Tana River County (7,200 served across Anole, Bura, and Garsen) with refugee support for South Sudanese, Somalis, Sudanese, and Yemenis in Kakuma and other camps, plus 2025 Disaster Risk Reduction capacity building including hazard assessment and simulation exercises.`,
        story: {
          quote: `This food will give us strength; my children will play again without crying from empty stomachs. May all the donors be rewarded for remembering us.`,
          attribution: `Mohammed, age 45, South Sudanese refugee, Kakuma refugee camp`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "4,133",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Kenya, HHRD distributed 4,133 Qurbani shares for 1446 AH (2025): 825 to Kenyan host communities alongside Congolese (715), Ethiopian (690), Somali (718), South Sudanese (825), and Sudanese refugees (360) in Kakuma and other camps, coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Afghanistan`,
    lat: 33.9391,
    lon: 67.71,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "2,600",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Afghanistan, HHRD's OSP serves 2,600 orphaned children with full sponsorship, plus bicycle distribution to enhance mobility and recreational opportunities.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "118",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Afghanistan, HHRD's HESP supports higher-education students pursuing degrees despite political instability, with graduates entering high-impact roles in healthcare, NGO, and government sectors.`,
        story: {
          quote: `Abdul Rahman graduated in 2024 from the Faculty of Law and Political Science at Nangarhar University with HHRD HESP support. Today he works for the World Health Organization in the Monitoring Department in Durbaba District, Nangarhar, earning a halal livelihood for his family.`,
          attribution: `Abdul Rahman, HESP graduate, Nangarhar`
        }
      },
      {
        code: "CWDP",
        beneficiaries: "200",
        cumulative: false,
        description: `HHRD's Children with Disabilities Program sponsors children with disabilities up to age 18 with physical therapy, assistive devices, ambulance referrals, and family support. In Afghanistan, HHRD's CWDP serves children with disabilities through HHRD's two CPRP centers and Mobile Family Clinic network across five provinces.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "21,373",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Afghanistan, HHRD constructs and rehabilitates community wells in drought-prone districts, paired with hygiene education for households and schools.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "1,642",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Afghanistan, HHRD trains men and women in mobile phone repair, tailoring, and other trades, with toolkit graduation enabling immediate self-employment.`,
        story: {
          quote: `I am very thankful to the donors of HHRD for this great sadaqah project. In HHRD's Skills Development Program we learn how to catch the fish instead of receiving one kg of fish.`,
          attribution: `Abdul Wahab, SDLP graduate, Afghanistan`
        }
      },
      {
        code: "SPR",
        beneficiaries: "7,954",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Afghanistan, HHRD builds shelters for displaced families and earthquake survivors in conflict-affected provinces.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "22,600",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. HHRD operates 2 Comprehensive Physical Rehabilitation Centers in Afghanistan: Kabul (established 2020, 5 departments) and Nangarhar (established 2024, 4 departments). First-half 2025: 5,744 physical therapy beneficiaries (surpassing target), 2,279 speech therapy, 513 psychotherapy, and 45 prosthetic and orthotic fittings.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "44,526",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Afghanistan, HHRD operates 2 mobile family clinics serving 5 provinces (Kunar, Laghman, Kabul, Parwan, Nangarhar), primarily reaching OSP, SDLP, and CWDP beneficiaries and their families. First-half 2025: 13,263 mobile clinic patients and 2,351 lab tests.`,
        story: {
          quote: `Usman, a 12th-grade student at Babulgehad High School in Shangarsha Village, Kunar Province, suffered from a left ankle dislocation that made his walk to school painful. When the HHRD Mobile Family Clinic visited his village, doctors examined him, provided pain medication, and referred him to an orthopedic center; with treatment and ankle support tools, he now attends school regularly.`,
          attribution: `Usman, 12th grade, Shangarsha Village, Kunar Province`
        }
      },
      {
        code: "ERDM",
        beneficiaries: "27,990",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Afghanistan, HHRD responded to multiple 2025 crises: returnees from Pakistan and Iran at Torkham, Spin Boldak, and Qala borders (11,700 beneficiaries with clean drinking water, cooked meals, 900 kitchenware kits, and 3 water filtration plants at the Anzerki returnee camp), plus the November 3 earthquake in Balkh and Samangan provinces (250 families with blankets, kitchenware, and food baskets).`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "1,420",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Afghanistan, HHRD distributed 1,420 Qurbani shares for 1446 AH (2025), providing Eid al-Adha meat to OSP-sponsored orphan families, SDLP trainees, and other vulnerable households.`,
        story: null
      },
    ]
  },
  {
    name: `Somalia/Somaliland`,
    lat: 5.1521,
    lon: 46.1996,
    aliases: ["Somalia", "Somaliland"],
    programs: [
      {
        code: "OSP",
        beneficiaries: "800",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Somalia, HHRD's OSP serves 800 orphaned children, including the Africa-wide sanitary napkin program identified through HHRD's field assessment across Kenya, Uganda, Somalia, and Tanzania.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "38,902",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Somalia and Somaliland, HHRD's WASH drills wells and installs water infrastructure in drought-affected areas and refugee-hosting communities.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "203",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Somalia and Somaliland, HHRD's SDLP trains women in tailoring and food production, addressing gendered economic gaps in displacement-affected communities.`,
        story: {
          quote: `I refused to let poverty steal my dreams. The donors, teachers, and HHRD family gave me tools to build my future.`,
          attribution: `Faduma, HHRD SDLC-Mogadishu ICT program graduate`
        }
      },
      {
        code: "CPRP",
        beneficiaries: "133",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Somalia, HHRD distributed 70 wheelchairs in the first half of 2025 through the CPRP Wheelchair Distribution Program.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "16,581",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Somalia and Somaliland, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 341 cataract surgeries (180 in Somalia, 161 in Somaliland) and 650 screenings.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "13,000",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Somalia and Somaliland, HHRD combined drought response, refugee support, and poverty alleviation: 1,000 displaced Somalis received rations and cooked food, while 12,000 in Somaliland received food assistance and non-food relief items addressing drought and refugee crises.`,
        story: {
          quote: `Fatima, a mother of six in Al-Hidaya IDP Camp in Mogadishu, was displaced from her rural village after consecutive droughts destroyed her livelihood. Through HHRD Africa's food distribution she received essential supplies that allowed her children to eat regularly for the first time in weeks, restoring her sense of dignity and giving her renewed hope to rebuild her family's future.`,
          attribution: `Fatima, mother of six, Al-Hidaya IDP Camp, Mogadishu`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "2,860",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Somalia and Somaliland, HHRD distributed 2,860 Qurbani shares for 1446 AH (2025), serving local Somali communities (540 shares) alongside Yemeni refugees in Somalia (2,155) and Somaliland (165), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Jordan`,
    lat: 30.5852,
    lon: 36.2384,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "4,200",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Jordan, HHRD's OSP combines Jordanian children with Syrian, Palestinian, and Yemeni refugee orphans, providing learning centers, transport support for Syrian orphans, and scouting programs.`,
        story: {
          quote: `In the Irbid Camp, Haneen lived with her mother and five sisters after her father's death. Through OSP sponsorship she joined summer and winter clubs, memorized three parts of the Holy Qur'an, developed public speaking skills, and reached a GPA of 99.6%. She dreams of one day sponsoring other orphans through HHRD.`,
          attribution: `Haneen Abu Al-Khail, Irbid Camp`
        }
      },
      {
        code: "ESP",
        beneficiaries: "2,230",
        cumulative: false,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Jordan, HHRD's ESP and HESP serve Syrian and Palestinian refugees alongside Jordanians. In 2025: 130 HESP scholarships plus mobile learning centers reaching refugee children and tuition assistance for displaced families.`,
        story: {
          quote: `Duha's family fled to Jordan because of the Syrian war and now lives in Amman, where her father works as a cleaner. With no public school nearby, they had to enroll her far from home. HHRD covered her transportation, uniform, and stationery costs, allowing her to focus on her studies.`,
          attribution: `Duha (name changed), Syrian refugee, Amman`
        }
      },
      {
        code: "CWDP",
        beneficiaries: "370",
        cumulative: false,
        description: `HHRD's Children with Disabilities Program sponsors children with disabilities up to age 18 with physical therapy, assistive devices, ambulance referrals, and family support. In Jordan, HHRD's CWDP serves children with disabilities among Syrian, Palestinian, and Jordanian families, with ambulance and rehabilitation referral support.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "4,920",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Jordan, HHRD focuses on sanitation upgrades and hygiene access in informal refugee settlements housing Syrian and Palestinian families.`,
        story: {
          quote: `We can finally drink clean water without fear, and it improved our children's health and our home hygiene.`,
          attribution: `Omar, father of eight, Gaza Camp, Jordan`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "482",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. HHRD's Jordan office was registered in April 2013 in Amman; what began as simple sewing and embroidery classes has grown into a multi-country initiative. In 2025 HHRD opened two new SDLP centers in Ein Albasha and Jerash, serving Syrian, Yemeni, Sudanese, and Palestinian refugees alongside Jordanians.`,
        story: null
      },
      {
        code: "SPR",
        beneficiaries: "11,550",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Jordan, HHRD's SPR repairs and rebuilds homes for widowed mothers and other vulnerable families living in inadequate housing.`,
        story: {
          quote: `Fatimah, a widowed mother, was raising her children in a house on the verge of collapsing. HHRD demolished and rebuilt it with a bedroom, living room, kitchen, and bathroom; she is preparing to move back in.`,
          attribution: `Fatimah Abu Jamous, Jordan`
        }
      },
      {
        code: "CPRP",
        beneficiaries: "343",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. HHRD's Jordan CPRP focuses on Hearing Aids for Children, serving young refugees whose hearing was affected by conflict in Syria and Palestine. In the first half of 2025: 153 hearing aid units distributed to 75 children with parent training and follow-up appointments, plus 53 wheelchairs including 3 electric units.`,
        story: {
          quote: `I never imagined a day would come when I would see my children hearing... This is a day I will never forget.`,
          attribution: `Mother of Linda, Sidra, and Zaid, Baqa'a Camp`
        }
      },
      {
        code: "ERDM",
        beneficiaries: "9,196",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Jordan, HHRD operates across Amman, Jerash, Irbid, Karak, Maan, and Al-Mafraq Governorates, serving Syrian, Palestinian, and Yemeni refugees alongside impoverished Jordanians. 2025 interventions: 66 Palestinian families with bread coupons, 1,400 in the Food Support Program, 1,400 Yemeni refugees with food packages, and 18 individuals with emergency medical expense coverage.`,
        story: {
          quote: `I was in critical condition and needed urgent treatment. This support helped save my life when I had no way to afford the medical care.`,
          attribution: `Mahmoud, diabetic coma survivor, Jordan`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "525",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Jordan, HHRD distributed 525 Qurbani shares for 1446 AH (2025) through HHRD-Jordan, serving Jordanians (25), Iraqi refugees (20), Palestinian refugees (205), Sudanese refugees (45), Syrian refugees (200), and Yemeni refugees (30).`,
        story: null
      },
    ]
  },
  {
    name: `Tanzania`,
    lat: -6.369,
    lon: 34.8888,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "450",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Tanzania, HHRD's OSP serves 450 orphaned children with full sponsorship plus bicycle distribution and the Africa-wide sanitary napkin program for girls.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "20,260",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Tanzania, HHRD's WASH installs community wells and water systems in rural areas, paired with hygiene education and Africa-wide sanitary napkin distribution for girls.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "220",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Tanzania, HHRD's SDLP trains women in tailoring and small enterprise skills, complementing the broader Africa region program.`,
        story: {
          quote: `After his father's death, Rashidi Seifu carried loads at the market for around $50 per month to support his mother and two younger siblings. He enrolled in HHRD's Skills Development Center for Electronics Technology and graduated at the top of his class. With a business start-up kit and his own storefront, he now earns around $180 per month as an electronics technician, enough for his siblings' education and the family's food and shelter.`,
          attribution: `Rashidi Seifu, electronics technician, Tanzania`
        }
      },
      {
        code: "CPRP",
        beneficiaries: "145",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Tanzania, HHRD distributed 80 wheelchairs in the first half of 2025 through the CPRP Wheelchair Distribution Program.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "5,624",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Tanzania, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 335 cataract surgeries and 450 screenings.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "202",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Tanzania, HHRD distributed 202 Qurbani shares for 1446 AH (2025): 92 for Tanzanian host communities and 110 for Congolese refugees, coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Uganda`,
    lat: 1.3733,
    lon: 32.2903,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "500",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Uganda, HHRD's OSP includes Butambala-area food package distributions and the Africa-wide sanitary napkin program that helps girls attend school consistently.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "16,086",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Uganda, HHRD installs community water points in areas with high refugee burden, easing pressure on host community resources.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "130",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Uganda, HHRD distributed 70 wheelchairs in the first half of 2025 through the CPRP Wheelchair Distribution Program.`,
        story: {
          quote: `Mgunya Bruno faced significant mobility challenges; even essential activities like visiting the hospital were incredibly difficult. After receiving a wheelchair from HHRD, his quality of life dramatically improved, enabling him to move freely and access essential services.`,
          attribution: `Mgunya Bruno, Uganda`
        }
      },
      {
        code: "HANP",
        beneficiaries: "5,362",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Uganda, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 225 cataract surgeries and 385 screenings.`,
        story: {
          quote: `61-year-old Wulusansa Ali was forced to rely on his mother as cataracts stole his vision. Now, thanks to free surgery from HHRD, he can become independent and take care of his mother once again.`,
          attribution: `Wulusansa Ali, age 61, cataract surgery recipient, Uganda`
        }
      },
      {
        code: "ERDM",
        beneficiaries: "3,000",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Uganda, HHRD delivered relief food distribution to 3,000 beneficiaries displaced by ongoing regional refugee crises.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "175",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Uganda, HHRD distributed 175 Qurbani shares for 1446 AH (2025), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Nepal`,
    lat: 28.3949,
    lon: 84.124,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "800",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Nepal, HHRD's OSP sponsors 800 orphaned children across Terai and remote districts with full sponsorship services.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "214",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Nepal, HHRD's ESP provides tuition support to students in remote villages, covering tuition fees, school supplies, uniforms, and transportation in geographically isolated communities.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "19,058",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Nepal's Terai region, where groundwater is declining due to excessive extraction, deforestation, sand mining, and reduced rainfall, HHRD installed 35 Bio-Sand Filtration plants and 7 Drinking Water Treatment Plants serving thousands of school children and families.`,
        story: {
          quote: `Students at Shree Janata Secondary School kept getting sick because the water pump was too close to the bathroom. HHRD installed a Bio-Sand Filtration Plant at a safe distance so the students could remain safe and well.`,
          attribution: `Shree Janata Secondary School, Nepal`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "246",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Nepal, HHRD's SDLP serves women in Terai and remote districts with vocational skills training and microbusiness support.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "72",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Nepal, HHRD distributed 70 wheelchairs in the first half of 2025 to individuals with mobility challenges through the CPRP Wheelchair Distribution Program.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "4,239",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Nepal, HHRD conducts free medical camps in remote villages (Golbazar in Siraha, Lohapatti in Mahottari, Malangawa in Sarlahi) and runs a specialized Uterine Prolapse project active since 2022 that has treated 115 women to date; first-half 2025: 1,969 general healthcare patients with 32 women diagnosed during prolapse screening and 20 receiving treatment.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "20",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Nepal, HHRD delivered Disaster Risk Reduction training in 2025, including Training of Trainers on Climate Adaptation in Kapilvastu, Siraha, Sarlahi, and Jhapa, plus training for local government representatives and community leaders.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "181",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Nepal, HHRD distributed 181 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Morocco`,
    lat: 31.7917,
    lon: -7.0926,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "200",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Morocco, HHRD's OSP sponsors 200 orphaned children with full sponsorship services.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "66",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Morocco, HHRD's SDLP learning center was established in response to the 2023 Marrakesh earthquake, offering sewing, tailoring, and embroidery courses serving 66 women in 2025.`,
        story: null
      },
      {
        code: "SPR",
        beneficiaries: "4,455",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Morocco, HHRD rebuilt homes for families displaced by the 2023 Marrakesh-area earthquake, with continued repair work in affected villages.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "96",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Morocco, HHRD's CPRP delivers rehabilitation support to earthquake-affected and underserved communities.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "20,006",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Morocco, HHRD operates a village clinic for victims of the 2023 Marrakesh-area earthquake, serving 3,400 patients in first-half 2025 alongside broader medical camp work for earthquake-affected populations.`,
        story: {
          quote: `Mohamed Rabah took a bus from the mountaintop to attend an HHRD medical camp for earthquake survivors. His daughters and grandchildren also attended, making it a wonderful gathering that brought the whole family together.`,
          attribution: `Mohamed Rabah, earthquake survivor, Morocco`
        }
      },
    ]
  },
  {
    name: `Lebanon`,
    lat: 33.8547,
    lon: 35.8623,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "250",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Lebanon, HHRD's OSP serves Syrian and Palestinian refugee children alongside local Lebanese orphans, with learning centers helping refugees access overcrowded public education.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "335",
        cumulative: false,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Lebanon, HHRD's ESP supports refugee and economically distressed students with tuition assistance and 50 HESP higher-education scholarships, recognizing the compounded impacts of the country's economic crisis on Syrian and Palestinian refugees alongside Lebanese students.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "178",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Arsal, Lebanon, where Syrian refugees live in harsh mountain conditions with winter temperatures below 0°C, HHRD installed 10 weather-resistant restroom units and 20 water storage tanks with iron bases for 30 families in 2025.`,
        story: {
          quote: `My children are clean, and I have the time to sit with them and be a mother again.`,
          attribution: `Tonia, mother of six, Lebanon`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "631",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Lebanon, HHRD's SDLP serves Syrian and Palestinian refugees plus Lebanese women with vocational training amid the country's ongoing economic crisis.`,
        story: null
      },
      {
        code: "SPR",
        beneficiaries: "1,790",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Lebanon, HHRD's SPR supports Syrian and Palestinian refugees plus impoverished Lebanese families with home repair, weather-proofing, and sanitation infrastructure in informal settlements like Arsal.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "90",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Lebanon, HHRD distributed 90 wheelchairs to Syrian and Palestinian refugees in the first half of 2025 through the CPRP Wheelchair Distribution Program.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "15,455",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Lebanon, HHRD delivered 3,091 food packages and monthly food rations to Syrian and Palestinian refugees and Lebanese host communities across Beirut, Akkar, Al Burj Camp, Arsal, and Al Naameh, addressing compounded poverty from the country's economic crisis and refugee burden.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "875",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Lebanon, HHRD distributed 875 Qurbani shares for 1446 AH (2025) through four implementing partners (AlBaydah, KITAF Humanitarian Aid, RHAO, URDA), serving Lebanese host communities (100 shares), Palestinian refugees (600), and Syrian refugees (175).`,
        story: null
      },
    ]
  },
  {
    name: `Djibouti`,
    lat: 11.8251,
    lon: 42.5903,
    aliases: [],
    programs: [
      {
        code: "WASH",
        beneficiaries: "10,349",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Djibouti, HHRD's WASH supports water access for Yemeni refugees and host communities, complementing ERDM dry-ration distributions.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "6,000",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Djibouti, HHRD delivered dry ration distributions to 6,000 Yemeni refugees, recognizing Djibouti as a key host country for displaced people fleeing Yemen's conflict.`,
        story: {
          quote: `For the first time since we escaped Yemen, I feel like my children will eat without fear. This food means life to us.`,
          attribution: `Abdirahman, Yemeni refugee, Djibouti`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "317",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Djibouti, HHRD distributed 317 Qurbani shares for 1446 AH (2025), serving local Djiboutians (36), Ethiopian refugees (36), Somali refugees (55), and Yemeni refugees (190), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Syria`,
    lat: 34.8021,
    lon: 38.9968,
    aliases: [],
    programs: [
      {
        code: "SPR",
        beneficiaries: "8,945",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Northern Syria, HHRD built two villages for earthquake survivors in 2023, providing permanent homes paired with a 24/7 community health clinic.`,
        story: {
          quote: `After losing his leg to a landmine, Wael spent years unable to support his family. Through HHRD's shelter program he received a rebuilt home and the dignity of a safe place for his children to grow up.`,
          attribution: `Wael Hassan Al-Mosleh, age 28, landmine survivor, Syria`
        }
      },
      {
        code: "HANP",
        beneficiaries: "2,558",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Northern Syria, HHRD operates a clinic within the first of two villages built in 2023 for earthquake survivors, supporting populations of both villages and surrounding communities with 24/7 free care. The clinic was expanded in 2025 to cover examinations, clinical treatment, and medication across multiple medical specialties.`,
        story: null
      },
    ]
  },
  {
    name: `Sri Lanka`,
    lat: 7.8731,
    lon: 80.7718,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "750",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Sri Lanka, HHRD's OSP sponsors 750 orphaned children, with continued cyclone- and disaster-related responses for sponsored families.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "300",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Sri Lanka, HHRD distributed 200 wheelchairs in the first half of 2025, one of the largest single-country distributions in the CPRP Wheelchair Distribution Program this period.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "402",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Sri Lanka, HHRD delivered 328 cataract surgeries in the first half of 2025 through the Prevention of Blindness initiative.`,
        story: {
          quote: `HHRD and its generous donors gave us our mother back.`,
          attribution: `Daughter of Mrs. Sabrina, age 43, cataract surgery recipient, Puttalam`
        }
      },
      {
        code: "ERDM",
        beneficiaries: "7,000",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Sri Lanka, HHRD responded to Cyclone Ditwah with comprehensive relief: household essentials, food packages, hygiene kits, educational kits, and community cleaning kits reaching 7,000 beneficiaries.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "75",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Sri Lanka, HHRD distributed 75 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `South Africa`,
    lat: -30.5595,
    lon: 22.9375,
    aliases: [],
    programs: [
      {
        code: "HANP",
        beneficiaries: "6,496",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In South Africa, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 350 cataract surgeries and 612 screenings.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "35",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In South Africa, HHRD distributed 35 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Philippines`,
    lat: 12.8797,
    lon: 121.774,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "400",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In the Philippines, HHRD's OSP sponsors 400 orphaned children, including in earthquake-prone regions of Cebu and Mindanao.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "92",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In the Philippines, HHRD's ESP provides university-level support to Filipino students, with 7 university graduates in 2025, alongside school readiness materials for underserved communities.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "2,050",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In the Philippines, HHRD's WASH supports water-system installation in Muslim Mindanao communities and disaster-affected areas.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "80",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In the Philippines, HHRD's SDLP serves women in Bangsamoro and disaster-affected regions with sewing, food production, and small enterprise skills.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "30",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In the Philippines, HHRD's CPRP delivers rehabilitation and assistive device support through partner organizations.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "3,383",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In the Philippines, HHRD responded to the September 30, 2025 magnitude 6.9 earthquake offshore northeast of Bogo City, Cebu, distributing emergency food, water, and hygiene kits to 825 affected families.`,
        story: {
          quote: `Norhana (name changed) felt the earthquake's strong tremors while at home; her house was not completely damaged but she feared being trapped in another strong tremor. She expressed deep gratitude for HHRD's culturally sensitive aid, noting that other agencies' relief often contains haram items and this was one of the rare visits from a Muslim-led organization.`,
          attribution: `Norhana (name changed), earthquake survivor, Philippines`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "22",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In the Philippines, HHRD distributed 22 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `India`,
    lat: 20.5937,
    lon: 78.9629,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "800",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In India, HHRD's OSP sponsors orphaned children across multiple states, with continued investments in school infrastructure including the Crescent Academy upgrades.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "765",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In India, HHRD's ESP combines Crescent Academy infrastructure upgrades (computer lab workstations, renovated facilities, modernized kitchen) with tuition reimbursement for vulnerable children in Jammu and Kashmir.`,
        story: {
          quote: `My father is a daily wage laborer. He used to borrow money from different people for my educational expenses. With HHRD ESP I am able to continue my education without my father falling into debt. The doors of opportunity have been opened for me. It is all possible now.`,
          attribution: `Aatif Farooq, ESP scholarship student, India`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "540",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In India, HHRD's SDLP delivers vocational training for women and marginalized youth across multiple states.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "1,285",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In India, HHRD distributed 1,285 Qurbani shares for 1446 AH (2025), including shares delivered in Kashmir Valley alongside other Indian states.`,
        story: null
      },
    ]
  },
  {
    name: `Thailand`,
    lat: 15.87,
    lon: 100.9925,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "928",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Thailand, HHRD's ESP distributes complete school readiness kits, removing material barriers to attendance for students in underserved communities.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "50",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Thailand, HHRD's CPRP delivers rehabilitation support through the regional ASEAN program.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "2,072",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Thailand, HHRD responded to tremors from the March 28, 2025 magnitude 7.7 Myanmar earthquake felt strongly across Thailand, distributing emergency food, water, and hygiene kits to 562 affected families.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "49",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Thailand, HHRD distributed 49 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Romania`,
    lat: 45.9432,
    lon: 24.9668,
    aliases: [],
    programs: [
      {
        code: "ERDM",
        beneficiaries: "2,550",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Romania, HHRD coordinated through its MENA office to deliver substantial food, winter relief, and Qurbani meat to Ukrainian refugees, later expanding to other refugee populations.`,
        story: {
          quote: `This box is more than food. It means we are seen. My kids smiled today because we had a warm meal together.`,
          attribution: `Saeed, father of two, Pakistani refugee in Constanta, Romania`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "20",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Romania, HHRD distributed 20 Qurbani shares for 1446 AH (2025) through Fundatia Centrul Cultural Islamic Islamul AZI, serving Ukrainian refugees.`,
        story: null
      },
    ]
  },
  {
    name: `Indonesia`,
    lat: -0.7893,
    lon: 113.9213,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "350",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Indonesia, HHRD's OSP sponsors 300 orphaned children with full sponsorship services.`,
        story: null
      },
      {
        code: "ESP",
        beneficiaries: "903",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Indonesia, HHRD's ESP supports remote and underserved students with 73 school kits delivered to Central Maluku, 180 pairs of shoes distributed nationally, and 15 laptops to expand digital access through the ASEAN initiative.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "562",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Indonesia, HHRD installs community water systems in remote villages across regions like Tasikmalaya in West Java, addressing both quality and reliability gaps.`,
        story: {
          quote: `Before HHRD's intervention, Endang and her community in Tasikmalaya had limited access to clean water. The new water system has transformed her household's daily life, giving her time for her family and providing safe water for her children.`,
          attribution: `Endang, Tasikmalaya, West Java`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "28",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Indonesia, HHRD's SDLP focuses on women-led microbusiness development through sewing, food production, and craft training.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "43",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Indonesia, HHRD's CPRP delivers rehabilitation services to children and adults with mobility needs.`,
        story: {
          quote: `I would like to express my deepest gratitude for the wheelchair that has been provided. This assistance is truly valuable in supporting my daily activities.`,
          attribution: `Siti Robi'ah, age 42, wheelchair recipient, Indonesia`
        }
      },
      {
        code: "HANP",
        beneficiaries: "80",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Indonesia, HHRD's HANP delivers community health services including maternal care, vaccination support, and basic clinic operations.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "480",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Indonesia, HHRD responded to severe November 2025 Sumatra floods and landslides that affected 3.3 million people and displaced 2.1 million. HHRD distributed 480 kits including essential infant care items and adult hygiene essentials in Seunong Village.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "84",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Indonesia, HHRD distributed 84 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Palestine - West Bank`,
    lat: 31.9522,
    lon: 35.2332,
    aliases: ["West Bank"],
    programs: [
      {
        code: "ESP",
        beneficiaries: "1,740",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In the West Bank, HHRD's ESP supports Palestinian students with tuition and supplies amid ongoing instability and movement restrictions.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "500",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In the West Bank, HHRD distributed 500 Qurbani shares for 1446 AH (2025) through Mixer Group for Sustainable Development and Integrated Consulting.`,
        story: null
      },
    ]
  },
  {
    name: `Haiti`,
    lat: 18.9712,
    lon: -72.2852,
    aliases: [],
    programs: [
      {
        code: "OSP",
        beneficiaries: "600",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Haiti, HHRD's OSP sponsors orphaned children in earthquake- and hurricane-affected communities with full sponsorship services.`,
        story: {
          quote: `Steve was just ten years old when he lost his father in a tragic accident and his mother could no longer support his education. After 9 years of sponsorship through HHRD, he received his high school diploma and delivered the graduation speech.`,
          attribution: `Steve, HHRD OSP graduate, Haiti`
        }
      },
      {
        code: "ESP",
        beneficiaries: "200",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Haiti, HHRD's ESP supports schools serving hurricane- and earthquake-affected communities with tuition, supplies, and infrastructure repair.`,
        story: {
          quote: `I thought I might never get the chance to go to school, but now I know I can achieve my dream.`,
          attribution: `Claudy, ESP student, Leogane`
        }
      },
      {
        code: "SDLP",
        beneficiaries: "46",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Haiti, HHRD's SDLP offers Solar Panel Installation certification, plumbing, and trade training, with toolkits and certification supporting graduates into stable income work.`,
        story: {
          quote: `After completing official certification through HHRD's Skills Development Program, Grégoire secured a full-time job as a solar system installer, earning $250 USD per month, well above Haiti's $179 average monthly salary.`,
          attribution: `Grégoire Miliere, age 52, Leogane`
        }
      },
      {
        code: "SPR",
        beneficiaries: "612",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Haiti, HHRD rebuilds homes for hurricane-affected families and supports earthquake-displaced households through long-term reconstruction projects.`,
        story: null
      },
      {
        code: "ERDM",
        beneficiaries: "500",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Haiti, HHRD responded to Hurricane Melissa (October 28, 2025) with food packages including rice, vegetable oil, beans, pasta, sugar, and milk, reaching 100 affected households across multiple regions.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "91",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Haiti, HHRD distributed 91 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Mali`,
    lat: 17.5707,
    lon: -3.9962,
    aliases: [],
    programs: [
      {
        code: "CPRP",
        beneficiaries: "44",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. The CPRP Wheelchair Distribution Program expanded into Mali in 2025 with 44 hand cycle wheelchairs delivered in the first half of the year.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "1,991",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Mali, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 200 cataract surgeries and 248 screenings.`,
        story: null
      },
    ]
  },
  {
    name: `DRC`,
    lat: -4.0383,
    lon: 21.7587,
    aliases: ["Dem. Rep. Congo", "Democratic Republic of Congo", "Democratic Republic of the Congo", "DR Congo"],
    programs: [
      {
        code: "CPRP",
        beneficiaries: "73",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. The CPRP Wheelchair Distribution Program expanded into DRC in 2025 with 53 wheelchairs delivered in the first half of the year, one of three new countries added alongside Mali and Togo.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "1,918",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In DRC, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 50 cataract surgeries and 83 screenings.`,
        story: null
      },
    ]
  },
  {
    name: `Colombia`,
    lat: 4.5709,
    lon: -74.2973,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "200",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Colombia, HHRD's ESP supports indigenous Amazonian student communities with school materials and tuition support.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "1,637",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Colombia, HHRD's WASH supports clean-water and sanitation access in marginalized indigenous communities.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "20",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Colombia, HHRD distributed 20 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Gambia`,
    lat: 13.4432,
    lon: -15.3101,
    aliases: [],
    programs: [
      {
        code: "CPRP",
        beneficiaries: "45",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Gambia, HHRD's CPRP delivers rehabilitation services with wheelchair distribution planned as part of HHRD's 2025 program expansion.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "1,701",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Gambia, HHRD's HANP delivers Prevention of Blindness awareness with cataract surgery expansion planned, alongside other health interventions.`,
        story: null
      },
    ]
  },
  {
    name: `Ethiopia`,
    lat: 9.145,
    lon: 40.4897,
    aliases: [],
    programs: [
      {
        code: "HANP",
        beneficiaries: "1,478",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Ethiopia, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 260 cataract surgeries and 300 screenings.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "210",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Ethiopia, HHRD distributed 210 Qurbani shares for 1446 AH (2025), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Jamaica`,
    lat: 18.1096,
    lon: -77.2975,
    aliases: [],
    programs: [
      {
        code: "ERDM",
        beneficiaries: "1,350",
        cumulative: false,
        description: `HHRD's Emergency Relief and Disaster Management Program responds to floods, earthquakes, conflict, and displacement with food, water, shelter, medicine, and hygiene supplies. In Jamaica, HHRD responded to Hurricane Melissa (October 28, 2025) with an in-kind container of medical supplies and critical equipment including incubators, ventilators, electric beds, and disposables, distributed to hospitals throughout the country.`,
        story: null
      },
    ]
  },
  {
    name: `Malaysia`,
    lat: 4.2105,
    lon: 101.9758,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "47",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Malaysia, HHRD's ESP supports Rohingya and Filipino refugee children plus marginalized local students through targeted scholarships.`,
        story: null
      },
      {
        code: "WASH",
        beneficiaries: "1,000",
        cumulative: false,
        description: `HHRD's Water, Sanitation, and Hygiene program installs wells, hand pumps, water filtration systems, and sanitation facilities alongside hygiene education. In Malaysia, HHRD's WASH supports water and sanitation needs in Rohingya refugee and underserved Muslim communities.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "27",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Malaysia, HHRD's SDLP serves Rohingya refugees and underserved local populations with sewing, tailoring, and food production training.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "40",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Malaysia, HHRD's CPRP delivers rehabilitation support through the regional ASEAN program.`,
        story: {
          quote: `A university student with mobility challenges struggled to attend classes and keep up with coursework. Receiving an electric wheelchair allowed her to move between lecture halls and pursue her degree with confidence.`,
          attribution: `University student wheelchair recipient, Malaysia`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "14",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Malaysia, HHRD distributed 14 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Laos`,
    lat: 19.8563,
    lon: 102.4955,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "850",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Laos, HHRD's ESP supports students with uniforms, bags, shoes, and stationery through the ASEAN education access initiative.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "14",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Laos, HHRD's SDLP delivers vocational training through ASEAN regional partnerships with toolkit and microbusiness support.`,
        story: {
          quote: `I am truly happy to have been part of this program, and I have learned many new skills that will be valuable for my future. Thank you for creating a space where I could grow and gain confidence.`,
          attribution: `Seang Mali, SDLP graduate, Laos`
        }
      },
      {
        code: "CPRP",
        beneficiaries: "55",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Laos, HHRD's CPRP delivers rehabilitation services and wheelchair support through the regional ASEAN program.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "26",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Laos, HHRD distributed 26 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Mexico`,
    lat: 23.6345,
    lon: -102.5528,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "431",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Mexico, HHRD's ESP delivers adult literacy, technical training, and English B2 certification, primarily serving working mothers and underserved learners pursuing improved job prospects.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "391",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Mexico, HHRD's SDLP intersects with ESP to deliver adult literacy, technical education, and English certification pathways for improved job prospects.`,
        story: {
          quote: `HHRD's SDLP support in Mexico includes adult English Language classes; many of the learners are working mothers building toward better job prospects.`,
          attribution: `Adult learners, HHRD SDLP English program, Mexico`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "24",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Mexico, HHRD distributed 24 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Togo`,
    lat: 8.6195,
    lon: 0.8248,
    aliases: [],
    programs: [
      {
        code: "CPRP",
        beneficiaries: "53",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. The CPRP Wheelchair Distribution Program expanded into Togo in 2025 with 53 wheelchairs delivered in the first half of the year.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "439",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Togo, HHRD's HANP includes Prevention of Blindness work, with first-half 2025 activity including 100 cataract surgeries and 150 screenings.`,
        story: {
          quote: `Toxoplasmosis during pregnancy left Fatouma Moussa nearly blind. Her turning point arrived when HHRD offered free surgery. Now, after 10 years, she can see clearly again.`,
          attribution: `Fatouma Moussa, cataract surgery recipient, Togo`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "75",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Togo, HHRD distributed 75 Qurbani shares for 1446 AH (2025), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Cambodia`,
    lat: 12.5657,
    lon: 104.991,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "30",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Cambodia, HHRD's ESP supports students with uniforms, bags, shoes, and stationery as part of the ASEAN education access initiative.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "65",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Cambodia, HHRD's SDLP offers vocational training through ASEAN regional partnerships, paired with toolkit and microbusiness support.`,
        story: null
      },
      {
        code: "SPR",
        beneficiaries: "186",
        cumulative: true,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Cambodia, HHRD's SPR supports housing for impoverished families through ASEAN regional partnerships.`,
        story: null
      },
      {
        code: "CPRP",
        beneficiaries: "100",
        cumulative: false,
        description: `HHRD's Comprehensive Physical Rehabilitation Program operates rehab centers and a global Wheelchair Distribution Program, delivering physical therapy, prosthetics, orthotics, hearing aids, speech therapy, and psychotherapy. In Cambodia, HHRD distributed 25 wheelchairs in the first half of 2025 through the CPRP Wheelchair Distribution Program targeting impoverished communities.`,
        story: null
      },
      {
        code: "HANP",
        beneficiaries: "100",
        cumulative: false,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Cambodia, HHRD delivered 100 cataract surgeries in the first half of 2025 through the Prevention of Blindness initiative.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "26",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Cambodia, HHRD distributed 26 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Turkiye`,
    lat: 38.9637,
    lon: 35.2433,
    aliases: ["Turkey", "Türkiye"],
    programs: [
      {
        code: "OSP",
        beneficiaries: "200",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In Turkiye, HHRD's OSP serves both Turkish nationals and Syrian refugee children displaced by 13 years of conflict.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "110",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Turkiye, HHRD's SDLP serves Syrian refugees displaced by 13 years of conflict with vocational training and microbusiness pathways.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "155",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Turkiye, HHRD distributed 155 Qurbani shares for 1446 AH (2025), serving Turkish nationals and Syrian refugee families.`,
        story: null
      },
    ]
  },
  {
    name: `Chad`,
    lat: 15.4542,
    lon: 18.7322,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "441",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Chad, HHRD distributed 441 Qurbani shares for 1446 AH (2025), serving Chadian host communities (105) alongside Cameroonian (105), Central African Republic (140), and Sudanese refugees (91), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Bosnia`,
    lat: 43.9159,
    lon: 17.6791,
    aliases: ["Bosnia and Herz.", "Bosnia and Herzegovina", "BiH"],
    programs: [
      {
        code: "ESP",
        beneficiaries: "364",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Bosnia, HHRD's ESP focuses on HESP higher-education scholarships, one of HHRD's larger HESP cohorts in Europe.`,
        story: {
          quote: `Amila Sahbegovic, 17, is a second-year student at the Secondary School of Economics in Zvornik and the most successful young athlete among returnees to the Republika Srpska entity. Her parents returned to Grbavci after persecution and continue to face financial challenges. With eight years of taekwondo training and four years on Bosnia and Herzegovina's national team, scholarships through HHRD and HO Merhamet help her pursue both education and athletics.`,
          attribution: `Amila Sahbegovic, age 17, taekwondo athlete, Zvornik, Bosnia`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "32",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Bosnia, HHRD distributed 32 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Madagascar`,
    lat: -18.7669,
    lon: 46.8691,
    aliases: [],
    programs: [
      {
        code: "HANP",
        beneficiaries: "150",
        cumulative: true,
        description: `HHRD's Healthcare and Nutrition Program operates integrated clinics, mobile medical units, ambulances, NICUs, ultrasound facilities, cataract surgeries, and nutrition support. In Madagascar, HHRD's HANP delivers community health and Prevention of Blindness services through partner organizations.`,
        story: null
      },
    ]
  },
  {
    name: `Peru`,
    lat: -9.19,
    lon: -75.0152,
    aliases: [],
    programs: [
      {
        code: "SDLP",
        beneficiaries: "100",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Peru, HHRD's SDLP trains indigenous Amazonian women in sewing and tailoring with toolkit support for home-based microbusinesses.`,
        story: {
          quote: `The pastry course gave me the tools and motivation to start. Now I have my own business, I generate income, and I am growing as an entrepreneur.`,
          attribution: `Lisbeth Caceres, SDLP pastry graduate, Peru`
        }
      },
      {
        code: "Qurbani",
        beneficiaries: "48",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Peru, HHRD distributed 48 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Ecuador`,
    lat: -1.8312,
    lon: -78.1834,
    aliases: [],
    programs: [
      {
        code: "ESP",
        beneficiaries: "90",
        cumulative: true,
        description: `HHRD's Education Support Program covers tuition, school supplies, and infrastructure for vulnerable students, with HESP scholarships extending support through university. In Ecuador, HHRD's ESP distributed 90 complete school kits in 2025, helping raise student attendance from 65% to 95% in the targeted community.`,
        story: null
      },
      {
        code: "SDLP",
        beneficiaries: "15",
        cumulative: false,
        description: `HHRD's Skills Development and Livelihood Program trains women and youth in vocational skills with toolkit and microbusiness support. In Ecuador, HHRD's SDLP supports indigenous Amazonian women with sewing, tailoring, and food production training plus toolkit support.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "21",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Ecuador, HHRD distributed 21 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Burundi`,
    lat: -3.3731,
    lon: 29.9189,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "115",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Burundi, HHRD distributed 115 Qurbani shares for 1446 AH (2025), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `Zimbabwe`,
    lat: -19.0154,
    lon: 29.1549,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "100",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Zimbabwe, HHRD distributed 100 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Malawi`,
    lat: -13.2543,
    lon: 34.3015,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "65",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Malawi, HHRD distributed 65 Qurbani shares for 1446 AH (2025), coordinated through HHRD Africa.`,
        story: null
      },
    ]
  },
  {
    name: `North Macedonia`,
    lat: 41.6086,
    lon: 21.7453,
    aliases: ["Macedonia"],
    programs: [
      {
        code: "OSP",
        beneficiaries: "50",
        cumulative: false,
        description: `HHRD's Orphan Support Program sponsors orphans up to age 18 across 21+ countries with school enrollment, monthly food packages, annual health checkups, hygiene kits, and Eid celebrations. In North Macedonia, HHRD's OSP sponsors 50 orphaned children, the smallest OSP cohort by number but a long-standing presence in the Balkans.`,
        story: null
      },
      {
        code: "Qurbani",
        beneficiaries: "15",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In North Macedonia, HHRD distributed 15 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Fiji`,
    lat: -17.7134,
    lon: 178.065,
    aliases: [],
    programs: [
      {
        code: "SPR",
        beneficiaries: "50",
        cumulative: false,
        description: `HHRD's Shelter Relief Program builds and repairs homes for displaced families, disaster survivors, and the chronically housing-insecure. In Fiji, HHRD's SPR responds to cyclone- and flood-displaced families with home repair and reconstruction support.`,
        story: null
      },
    ]
  },
  {
    name: `Brazil`,
    lat: -14.235,
    lon: -51.9253,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "45",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Brazil, HHRD distributed 45 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Poland`,
    lat: 51.9194,
    lon: 19.1451,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "35",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Poland, HHRD distributed 35 Qurbani shares for 1446 AH (2025) through Muzulmanska Fundacja Pomocy (Muslim Help Foundation in Poland), serving Ukrainian refugees.`,
        story: null
      },
    ]
  },
  {
    name: `Sierra Leone`,
    lat: 8.4606,
    lon: -11.7799,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "35",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Sierra Leone, HHRD distributed 35 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Ghana`,
    lat: 7.9465,
    lon: -1.0232,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "31",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Ghana, HHRD distributed 31 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Kosovo`,
    lat: 42.6026,
    lon: 20.903,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "22",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Kosovo, HHRD distributed 22 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Mauritania`,
    lat: 21.0079,
    lon: -10.9408,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "22",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Mauritania, HHRD distributed 22 Qurbani shares for 1446 AH (2025) through Khair Foundation.`,
        story: null
      },
    ]
  },
  {
    name: `Trinidad and Tobago`,
    lat: 10.6918,
    lon: -61.2225,
    aliases: ["Trinidad", "Tobago"],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "21",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Trinidad and Tobago, HHRD distributed 21 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Tunisia`,
    lat: 33.8869,
    lon: 9.5375,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "21",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Tunisia, HHRD distributed 21 Qurbani shares for 1446 AH (2025) through RADROS Network of Development Associations.`,
        story: null
      },
    ]
  },
  {
    name: `Guyana`,
    lat: 4.8604,
    lon: -58.9302,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "19",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Guyana, HHRD distributed 19 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Dominican Republic`,
    lat: 18.7357,
    lon: -70.1627,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "17",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In the Dominican Republic, HHRD distributed 17 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Dominica`,
    lat: 15.415,
    lon: -61.371,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "14",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In Dominica, HHRD distributed 14 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
  {
    name: `Bahamas`,
    lat: 25.0343,
    lon: -77.3963,
    aliases: [],
    programs: [
      {
        code: "Qurbani",
        beneficiaries: "10",
        cumulative: false,
        description: `HHRD's annual Qurbani program distributes Eid al-Adha meat shares to vulnerable families and refugees worldwide; each share approximates one family's portion. In the Bahamas, HHRD distributed 10 Qurbani shares for 1446 AH (2025).`,
        story: null
      },
    ]
  },
];

// Photo manifest. The app expects images at /photos/{country-slug}/{PROGRAM}_{n}.jpg
// where country-slug is the name lowercased with non-alphanumerics replaced by '-'.
// Add a country-program key with the number of photos available (1-3 typically).
// Entries here override the default behavior of assuming zero photos.
// Format: 'CountryName|PROGRAM_CODE': numberOfPhotos
export const PHOTO_MANIFEST = {
  // Pakistan
  'Pakistan|OSP': 3,
  'Pakistan|ESP': 1,
  'Pakistan|CWDP': 3,
  'Pakistan|SDLP': 3,
  'Pakistan|SPR': 3,
  'Pakistan|CPRP': 3,
  'Pakistan|HANP': 3,
  'Pakistan|ERDM': 3,
  'Pakistan|Qurbani': 3,
  'Pakistan|KIND-R': 3,
  // Palestine - Gaza
  'Palestine - Gaza|WASH': 3,
  'Palestine - Gaza|SPR': 3,
  'Palestine - Gaza|ERDM': 3,
  'Palestine - Gaza|Qurbani': 3,
  // Bangladesh
  'Bangladesh|OSP': 3,
  'Bangladesh|ESP': 3,
  'Bangladesh|SPR': 3,
  'Bangladesh|CPRP': 3,
  'Bangladesh|HANP': 3,
  // Kenya
  'Kenya|OSP': 3,
  'Kenya|CWDP': 3,
  'Kenya|SDLP': 3,
  'Kenya|CPRP': 3,
  'Kenya|HANP': 3,
  'Kenya|ERDM': 3,
  // Afghanistan
  'Afghanistan|OSP': 3,
  'Afghanistan|ESP': 3,
  'Afghanistan|CWDP': 3,
  'Afghanistan|WASH': 4,
  'Afghanistan|SDLP': 4,
  'Afghanistan|SPR': 4,
  'Afghanistan|CPRP': 3,
  'Afghanistan|HANP': 4,
  'Afghanistan|ERDM': 3,
  'Afghanistan|Qurbani': 3,
  // Somalia/Somaliland
  'Somalia/Somaliland|OSP': 3,
  'Somalia/Somaliland|SDLP': 3,
  'Somalia/Somaliland|CPRP': 3,
  'Somalia/Somaliland|HANP': 1,
  // Jordan
  'Jordan|OSP': 3,
  'Jordan|ESP': 3,
  'Jordan|CWDP': 3,
  'Jordan|WASH': 3,
  'Jordan|SDLP': 3,
  'Jordan|SPR': 3,
  'Jordan|CPRP': 3,
  'Jordan|ERDM': 3,
  'Jordan|Qurbani': 3,
  // Tanzania
  'Tanzania|OSP': 3,
  'Tanzania|SDLP': 3,
  'Tanzania|CPRP': 1,
  // Uganda
  'Uganda|OSP': 3,
  'Uganda|CPRP': 3,
  'Uganda|HANP': 2,
  // Nepal
  'Nepal|OSP': 3,
  'Nepal|ESP': 1,
  'Nepal|WASH': 3,
  'Nepal|SDLP': 3,
  'Nepal|CPRP': 3,
  'Nepal|HANP': 3,
  'Nepal|ERDM': 3,
  'Nepal|Qurbani': 3,
  // Morocco
  'Morocco|SPR': 3,
  // Lebanon
  'Lebanon|OSP': 3,
  'Lebanon|ESP': 3,
  'Lebanon|SDLP': 3,
  'Lebanon|ERDM': 3,
  'Lebanon|Qurbani': 2,
  // Syria
  'Syria|SPR': 3,
  // Sri Lanka
  'Sri Lanka|HANP': 2,
  'Sri Lanka|Qurbani': 2,
  // Philippines
  'Philippines|OSP': 3,
  'Philippines|SDLP': 3,
  'Philippines|CPRP': 3,
  'Philippines|Qurbani': 3,
  // Thailand
  'Thailand|ESP': 3,
  'Thailand|CPRP': 3,
  // Indonesia
  'Indonesia|OSP': 3,
  'Indonesia|ESP': 3,
  'Indonesia|SDLP': 2,
  // Haiti
  'Haiti|OSP': 3,
  // Malaysia
  'Malaysia|WASH': 3,
  // Laos
  'Laos|ESP': 3,
  // Cambodia
  'Cambodia|ESP': 1,
  'Cambodia|SPR': 3,
  'Cambodia|HANP': 3,
  // Turkiye
  'Turkiye|SDLP': 2,
  // Tunisia
  'Tunisia|Qurbani': 3,
};

// Generate country-slug for photo paths (case-insensitive, hyphenated)
export function countrySlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}