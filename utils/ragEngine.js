const { getDynamicKnowledge } = require('./knowledgeEngine');

/**
 * Syed RAG Engine: Local Vectorized Search & Generation
 * No API Key required.
 */

// Simple Vectorizer: Converts text into a word-count map (TF-Vector)
function vectorize(text) {
  const words = text.toLowerCase().match(/\w+/g) || [];
  const freq = {};
  words.forEach(w => { if (w.length > 3) freq[w] = (freq[w] || 0) + 1; });
  return freq;
}

// Cosine Similarity: Measures how similar two text vectors are
function calculateSimilarity(vec1, vec2) {
  let score = 0;
  for (const word in vec1) {
    if (vec2[word]) score += vec1[word] * vec2[word];
  }
  return score;
}

function processRAGQuery(query) {
  const rawData = getDynamicKnowledge();
  const queryVec = vectorize(query);

  // 1. CHUNKING: Split portfolio into searchable blocks
  const chunks = rawData.split('###').filter(c => c.trim().length > 10).map(c => ({
    text: c.trim(),
    vector: vectorize(c)
  }));

  // 2. RETRIEVAL: Find top matching chunk
  const scored = chunks.map(chunk => ({
    ...chunk,
    score: calculateSimilarity(queryVec, chunk.vector)
  })).sort((a, b) => b.score - a.score);

  const bestMatch = scored[0];
  const context = bestMatch && bestMatch.score > 0 ? bestMatch.text : "No specific data found.";

  // 3. GENERATION (Template-based Local Synthesizer)
  const greetings = ["Scanning my neural core...", "Analyzing portfolio data...", "Retrieving Syed's work records..."];
  const prefix = greetings[Math.floor(Math.random() * greetings.length)];

  if (bestMatch && bestMatch.score > 0) {
    return `${prefix} I found relevant info: ${bestMatch.text.substring(0, 400)}... Is there anything specific about this you'd like to explore?`;
  }

  return "I'm Syed's Local AI. I can guide you through his Projects, Skills, and Experience. Try asking 'What tech stack does Syed use?'";
}

module.exports = { processRAGQuery };
