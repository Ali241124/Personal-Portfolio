const { getDynamicKnowledge } = require('./knowledgeEngine');

/**
 * Syed RAG Engine: Local Vectorized Search & Generation
 * No API Key required.
 */

// Simple Vectorizer: Converts text into a word-count map (TF-Vector)
// Added stop-words to prevent broad matching on common words like "Syed"
const STOP_WORDS = new Set(["syed", "user", "portfolio", "details", "about", "give", "tell", "what", "where", "how", "with", "from", "this", "that"]);

function vectorize(text) {
  const words = text.toLowerCase().match(/\w+/g) || [];
  const freq = {};
  words.forEach(w => { 
    if (w.length > 2 && !STOP_WORDS.has(w)) {
      freq[w] = (freq[w] || 0) + 1; 
    }
  });
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

  // 2. RETRIEVAL: Find top matching chunks
  const scored = chunks.map(chunk => ({
    ...chunk,
    score: calculateSimilarity(queryVec, chunk.vector)
  }))
  .filter(chunk => chunk.score > 0)
  .sort((a, b) => b.score - a.score);

  // 3. GENERATION
  if (scored.length === 0) {
    return "I'm Syed's Assistant. I can tell you about his AI/ML projects (like MNIST or YOLO), tech stack, experience, or provide his CV and contact links. What would you like to know?";
  }

  // Precision Logic: Only include secondary chunks if they are nearly as relevant as the top one
  const topScore = scored[0].score;
  const matches = scored.filter(m => m.score >= topScore * 0.8); // 80% similarity threshold compared to best
  
  // Limit to max 2 chunks unless it's a very specific query that hits many things
  const finalMatches = matches.slice(0, 2);
  const combinedContext = finalMatches.map(m => m.text).join("\n\n");
  
  const greetings = ["Scanning my neural core...", "Analyzing portfolio data...", "Retrieving Syed's work records..."];
  const prefix = greetings[Math.floor(Math.random() * greetings.length)];

  let response = `${prefix}\n\n`;
  
  // Natural lead-in
  if (finalMatches.length > 1) {
    response += "I've found information across a few areas of Syed's portfolio:\n\n";
  } else {
    response += "Here are the details I found:\n\n";
  }

  response += combinedContext;

  return response;
}

module.exports = { processRAGQuery };
