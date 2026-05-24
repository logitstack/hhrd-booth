// ============================================================
// HHRD Booth Quiz - Question Bank
//
// All quiz answer countries must exist in COUNTRY_DATA (with name or alias
// matching), since visitors answer by tapping the country on the globe.
//
// Pool is intentionally small. The quiz engine picks QUIZ_LENGTH random
// questions per game, so two of these are omitted in any given play, giving
// repeat visitors slight variation.
// ============================================================

export const QUIZ_LENGTH = 8;  // questions per game

export const QUIZ_QUESTIONS = [
  // ---- Refugees ----
  {
    id: 'turkiye-syrian-refugees',
    question: "Which country hosts the world's largest population of Syrian refugees?",
    answer: 'Turkiye',
    context: "Turkiye has hosted over 3 million Syrians since the civil war began in 2011. HHRD operates refugee support programs there.",
    category: 'refugees',
    source: 'UNHCR'
  },
  {
    id: 'lebanon-percapita',
    question: "Which country hosts the world's highest number of refugees per capita?",
    answer: 'Lebanon',
    context: "Roughly 1 in 5 people in Lebanon is a refugee, including 1.5 million Syrians and over 470,000 Palestinians. HHRD operates orphan support and emergency relief programs there.",
    category: 'refugees',
    source: 'UNHCR'
  },
  {
    id: 'syria-displaced',
    question: "Civil war since 2011 has produced over 6 million refugees from which country?",
    answer: 'Syria',
    context: "The Syrian conflict has displaced more than half of the country's pre-war population. HHRD provides shelter, food, and medical aid inside Syria and to Syrian refugees regionally.",
    category: 'refugees',
    source: 'UNHCR'
  },
  {
    id: 'rohingya',
    question: "The Rohingya refugee crisis displaced over 700,000 people from Myanmar to which neighboring country in 2017?",
    answer: 'Bangladesh',
    context: "Most Rohingya now live in the Kutupalong camp complex in Cox's Bazar, the world's largest refugee settlement, with roughly 880,000 residents. HHRD operates there.",
    category: 'refugees',
    source: 'UNHCR'
  },

  // ---- Crises ----
  {
    id: 'haiti-earthquake',
    question: "A magnitude 7.0 earthquake occurred in which country in January 2010?",
    answer: 'Haiti',
    context: "The January 2010 earthquake remains one of the most devastating natural disasters of the 21st century. HHRD continues humanitarian work in Haiti through orphan support and emergency response.",
    category: 'crises'
  },

  // ---- HHRD specific ----
  {
    id: 'kindr',
    question: "HHRD's neurological hospital, KIND-R, is located in which country?",
    answer: 'Pakistan',
    context: "The Karachi Institute of Neurological Diseases and Rehabilitation is HHRD's flagship medical facility, projected to serve 100,000+ patient visits annually once fully operational.",
    category: 'hhrd'
  },
  {
    id: 'gaza-erdm',
    question: "HHRD's largest 2024 emergency response served nearly half a million people in which territory?",
    answer: 'Palestine - Gaza',
    context: "Since October 2023, HHRD's Emergency Relief and Disaster Management program has reached over 468,000 people in Gaza with food, water, medical aid, and shelter.",
    category: 'hhrd'
  },
  {
    id: 'hhrd-largest',
    question: "Which country has HHRD's largest beneficiary count, with over 1.2 million people reached?",
    answer: 'Pakistan',
    context: "Pakistan is HHRD's largest country of operation, with 1.28 million beneficiaries served across 11 programs in 2025 including KIND-R, WASH, orphan support, and SDLP.",
    category: 'hhrd'
  },

  // ---- Variety ----
  {
    id: 'india-population',
    question: "Which country surpassed China in 2023 to become the world's most populous?",
    answer: 'India',
    context: "India is now home to over 1.4 billion people. HHRD operates orphan support, education, and emergency response programs across India.",
    category: 'general'
  },
  {
    id: 'brazil-floods-2024',
    question: "Severe floods displaced over 600,000 people from which South American country in May 2024?",
    answer: 'Brazil',
    context: "The Rio Grande do Sul floods were one of the worst climate disasters in Brazilian history. HHRD operates relief programs across Latin America.",
    category: 'crises'
  }
];

// ---- Leaderboard storage helpers -------------------------------------------
// Stored in localStorage as JSON. Capped at top MAX_LEADERBOARD entries by
// score (descending), then by recency.

const LEADERBOARD_KEY = 'hhrd:quiz:leaderboard:v1';
const MAX_LEADERBOARD = 10;

export const Leaderboard = {
  read() {
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  },
  add(name, score, total) {
    const entries = this.read();
    const cleaned = String(name || "Guest").trim().slice(0, 14) || "Guest";
    entries.push({ name: cleaned, score, total, ts: Date.now() });
    entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.ts - a.ts;
    });
    const trimmed = entries.slice(0, MAX_LEADERBOARD);
    try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed)); } catch {}
    return trimmed;
  },
  reset() {
    try { localStorage.removeItem(LEADERBOARD_KEY); } catch {}
  }
};

// Pick QUIZ_LENGTH random questions, no duplicates. If the pool is smaller
// than requested, returns the full pool shuffled.
export function pickQuestions(n = QUIZ_LENGTH) {
  const pool = QUIZ_QUESTIONS.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}
