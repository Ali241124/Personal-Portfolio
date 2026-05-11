const fs = require('fs');
const path = require('path');

/**
 * Returns a clean, text-based summary of Syed's portfolio data.
 * Avoiding dynamic JSX scraping prevents raw code from being sent to the AI user.
 */
function getDynamicKnowledge() {
  return `
### Bio & Professional Overview
Syed Ali Hassan is a highly skilled AI/ML Developer and Full-Stack Software Engineer with a passion for building intelligent, scalable systems. He specializes in bridging the gap between advanced machine learning models and modern web architectures. Syed is dedicated to solving complex real-world problems through innovative technology and data-driven insights.

### Featured Projects
Syed has a diverse portfolio of high-impact projects:
- **MNIST Digit Classifier**: A high-performance Convolutional Neural Network (CNN) achieving an impressive 99.2% accuracy in handwritten digit recognition.
- **Sentiment Analyzer**: A sophisticated NLP tool built by fine-tuning BERT (Bidirectional Encoder Representations from Transformers) for deep emotional context understanding.
- **Real-Time Object Detection**: A computer vision application leveraging YOLOv8 for lightning-fast and accurate object identification in live video streams.
- **AI Chatbot (Syed Assistant)**: A conversational AI powered by LangChain and OpenAI, integrated with local retrieval systems for personalized interactions.
- **Auto Avenue**: A comprehensive car marketplace mobile application built using React Native, featuring real-time listings and search functionality.
- **AI Portfolio Website**: This very platform, designed with React, Framer Motion, and custom RAG-based AI integration for a premium user experience.

### Technical Skill Set (Stack)
Syed is proficient in a wide array of modern technologies:
- **Languages**: Python (Advanced), JavaScript (ES6+), C++, SQL.
- **AI/ML Frameworks**: TensorFlow, Keras, PyTorch, HuggingFace, Scikit-learn, OpenCV.
- **Web Backend**: Node.js, Express, Fast API, MongoDB, PostgreSQL.
- **Web Frontend**: React.js, Next.js, Framer Motion, Tailwind CSS.
- **Tools & DevOps**: Git, Docker, Vercel, AWS, Linux.

### Experience, Education & Goals
Syed has significant hands-on experience in both Machine Learning and Full-Stack Development. He is a continuous learner, constantly exploring the latest research in Generative AI and Large Language Models (LLMs). His goal is to contribute to meaningful AI research and develop software that makes a global impact.

### Contact & Links
You can connect with Syed or view his work through the following channels:
- **Email**: syedali.hassan2040@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/syedalihassan24
- **GitHub**: https://github.com/Ali241124
- **CV/Resume**: You can download Syed's latest CV from this link: https://your-cv-link-here.pdf (Replace this with your actual link if needed)
  `;
}

module.exports = { getDynamicKnowledge };
