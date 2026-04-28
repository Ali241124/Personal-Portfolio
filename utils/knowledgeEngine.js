const fs = require('fs');
const path = require('path');

/**
 * Returns a clean, text-based summary of Syed's portfolio data.
 * Avoiding dynamic JSX scraping prevents raw code from being sent to the AI user.
 */
function getDynamicKnowledge() {
  return `
### Bio & Overview
Syed Ali Hassan is a passionate AI/ML Developer and Software Engineer. He loves building intelligent systems, web applications, and solving complex problems with modern technology.

### Projects
Syed's featured projects include:
- MNIST Digit Classifier: A CNN model with 99.2% accuracy.
- Sentiment Analyzer: A fine-tuned BERT NLP model.
- Real-Time Object Detection: YOLOv8-powered object detection app.
- AI Chatbot: A conversational bot powered by LangChain and OpenAI.
- Auto Avenue: A React Native car marketplace.
- AI Portfolio Website: A sleek portfolio built with React and Framer Motion.

### Technical Stack
Syed specializes in Python, React, Node.js, TensorFlow, OpenCV, HuggingFace, MongoDB, Express, and modern web development tools.

### Experience & Education
Syed has hands-on experience in Machine Learning and Full-Stack Development. He is constantly learning and building real-world AI applications and scalable web architectures.
  `;
}

module.exports = { getDynamicKnowledge };
