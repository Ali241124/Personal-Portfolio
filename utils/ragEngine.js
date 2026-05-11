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

  // 2. RETRIEVAL: Find top matching chunks (Multi-chunk retrieval)
  const scored = chunks.map(chunk => ({
    ...chunk,
    score: calculateSimilarity(queryVec, chunk.vector)
  }))
  .filter(chunk => chunk.score > 0)
  .sort((a, b) => b.score - a.score);

  // 3. GENERATION (Improved Synthesizer)
  if (scored.length === 0) {
    return "I'm Syed's Assistant. I can tell you about his AI/ML projects (like MNIST or YOLO), his tech stack (React, Python), his experience, or provide his CV and contact links. What would you like to know?";
  }

  // If query is broad, include more chunks
  const isBroadQuery = query.toLowerCase().includes("syed") || query.toLowerCase().includes("user") || query.toLowerCase().includes("all") || query.toLowerCase().includes("details");
  const topMatches = isBroadQuery ? scored.slice(0, 3) : scored.slice(0, 2);
  
  const combinedContext = topMatches.map(m => m.text).join("\n\n");
  
  const greetings = ["Scanning my neural core...", "Analyzing portfolio data...", "Retrieving Syed's work records...", "Accessing encrypted data..."];
  const prefix = greetings[Math.floor(Math.random() * greetings.length)];

  let response = `${prefix}\n\n`;
  
  // Format the response more naturally
  if (combinedContext.includes("Projects") && combinedContext.includes("Bio")) {
    response += "I've compiled a comprehensive overview of Syed's profile and projects for you:\n\n";
  } else if (combinedContext.includes("Stack")) {
    response += "Here is the technical infrastructure Syed works with:\n\n";
  } else {
    response += "Here is the information I found relevant to your query:\n\n";
  }

  response += combinedContext;

  return response;
}

module.exports = { processRAGQuery };
