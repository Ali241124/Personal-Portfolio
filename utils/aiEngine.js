const { getDynamicKnowledge } = require('./knowledgeEngine');

/**
 * The Local Brain: Processes user queries using Syed's portfolio data.
 * No API key needed. 100% accurate.
 */
function processLocalQuery(message, history) {
  const data = getDynamicKnowledge();
  const input = message.toLowerCase();
  
  // 1. Identify Intent
  const intents = {
    projects: ['project', 'build', 'made', 'work', 'mnist', 'bert', 'yolo', 'auto avenue'],
    skills: ['skill', 'tech', 'stack', 'expert', 'know', 'python', 'react', 'tensorflow'],
    experience: ['experience', 'job', 'edu', 'study', 'university', 'career', 'certified'],
    bio: ['who are you', 'tell me about', 'syed', 'ali', 'hassan', 'background', 'bio']
  };

  let matchedIntent = 'general';
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(k => input.includes(k))) {
      matchedIntent = intent;
      break;
    }
  }

  // 2. Extract Relevant Blocks from the Auto-Scanned Data
  const sections = data.split('###');
  let response = "";

  switch (matchedIntent) {
    case 'projects':
      const projData = sections.find(s => s.includes('Projects')) || "";
      response = `Syed has built some impressive AI systems, including: ${projData.substring(0, 300)}... They are all built with a focus on real-world utility!`;
      break;
    case 'skills':
      const skillData = sections.find(s => s.includes('Technical Stack')) || "";
      response = `Syed is highly proficient in: ${skillData.substring(0, 300)}... He specializes in the MERN stack and Deep Learning.`;
      break;
    case 'experience':
      const expData = sections.find(s => s.includes('Experience')) || "";
      response = `Syed is currently pursuing his BS in Computer Science and has multiple certifications in Deep Learning and Machine Learning. ${expData.substring(0, 200)}...`;
      break;
    case 'bio':
      const bioData = sections.find(s => s.includes('Bio')) || "";
      response = `Syed Ali Hassan is an AI/ML enthusiast based in Karachi, Pakistan. He's passionate about building intelligent systems. ${bioData.substring(0, 200)}...`;
      break;
    default:
      response = "I'm Syed's Assistant! I can tell you about his projects, technical skills, or his professional journey. What would you like to know?";
  }

  return response;
}

module.exports = { processLocalQuery };
