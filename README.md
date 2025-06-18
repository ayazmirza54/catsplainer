# 🐱 Catsplainer

A fun React application that explains complex topics using adorable tiny cats as metaphors! Powered by Google's Gemini AI, it generates both text explanations and cute illustrations to make learning engaging and entertaining.

## ✨ Features

- **AI-Powered Explanations**: Uses Google Gemini 2.0 Flash to generate explanations
- **Cat Metaphors**: Every explanation uses tiny cats as metaphors to make concepts relatable
- **Auto-Generated Illustrations**: Creates cute, minimal illustrations for each explanation
- **Interactive Examples**: Click on example questions to get started quickly
- **Real-time Streaming**: See explanations and images appear as they're generated
- **Modern UI**: Clean, responsive interface built with React and TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- A Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd catsplainer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your API key**

   Create a `.env` file in the project root and add your Gemini API key:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   To get your API key:

   1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   2. Sign in with your Google account
   3. Create a new API key
   4. Copy the key to your `.env` file

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to see the application running.

## 🎯 How to Use

1. **Type your question** in the text area at the bottom of the page
2. **Press Enter** or click on one of the example questions
3. **Watch the magic happen** as tiny cats explain your topic with illustrations!
4. **Each sentence** gets its own cute illustration to help visualize the concept

### Example Questions

- "How does photosynthesis work?"
- "What is machine learning?"
- "Explain quantum physics"
- "How do computers work?"
- "What is climate change?"

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **AI**: Google Gemini 2.0 Flash (with image generation)
- **Styling**: CSS with modern design principles
- **Markdown**: Marked.js for text formatting

## 📁 Project Structure

```
catsplainer/
├── src/
│   ├── components/
│   │   └── catsplainer.tsx    # Main component
│   ├── App.tsx               # Root component
│   ├── main.tsx             # Entry point
│   └── ...
├── public/                  # Static assets
├── .env                     # Environment variables (create this)
└── package.json
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

| Variable              | Description                | Required |
| --------------------- | -------------------------- | -------- |
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes      |

## 🎨 How It Works

1. **User Input**: You type a question about any topic
2. **AI Processing**: The question is sent to Google Gemini with special instructions to use tiny cats as metaphors
3. **Streaming Response**: The AI generates both text and images in real-time
4. **Visual Display**: Each sentence appears with its corresponding cat illustration
5. **Interactive Experience**: You can ask follow-up questions or try new topics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- The React and Vite communities for the excellent development tools
- All the tiny cats who make learning fun! 🐱

## 🐛 Troubleshooting

### API Key Issues

- Make sure your `.env` file is in the project root
- Ensure the variable name starts with `VITE_`
- Restart the development server after adding the `.env` file
- Check that your API key is valid and has the necessary permissions

### Build Issues

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 16+)

### Runtime Issues

- Check the browser console for error messages
- Ensure you have a stable internet connection for AI API calls

---

Made with ❤️ and lots of tiny cats! 🐱✨
