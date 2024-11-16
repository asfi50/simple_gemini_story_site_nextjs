# ✨ Story Time Magic - Kids Story Generator

An interactive web application that generates unique children's stories using Google's Gemini AI. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- Real-time story generation based on user prompts
- Beautiful, responsive UI with dark mode support
- Form validation and error handling
- Seamless integration with Google's Gemini AI
- Accessible components using Radix UI

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- Google Gemini API key

### Installation

1. Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd kids-story-generator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory:
    ```bash
    NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

Visit `http://localhost:3000` to see the application.

## 🛠️ Built With

- Next.js - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Google Generative AI - Story generation
- React Hook Form - Form handling
- Zod - Schema validation
- Radix UI - UI components

## 📝 Usage

1. Enter a topic in the input field (e.g., "friendly dragon" or "space adventure")
2. Click the "Create Story" button
3. Watch as a unique story is generated based on your prompt
4. Enjoy reading your personalized story!

## 🔒 Environment Variables

Required environment variables:
- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
