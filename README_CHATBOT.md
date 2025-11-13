# OpenAI Chatbot Setup

## Overview
The application includes an AI-powered chatbot assistant that can help with restaurant operations, inventory management, menu planning, and more.

## Setup Instructions

### 1. Get Your OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Create a new API key
4. Copy the key (you won't be able to see it again)

### 2. Configure the API Key

**Option A: Environment Variable (Recommended)**
1. Create a `.env` file in the `src` directory
2. Add the following line:
   ```
   REACT_APP_OPENAI_API_KEY=your_actual_api_key_here
   ```
3. Restart your development server

**Option B: Direct Configuration**
1. Open `src/components/ChatBot.jsx`
2. Find the line with `process.env.REACT_APP_OPENAI_API_KEY || ""`
3. You can temporarily add your key there (not recommended for production)

### 3. Usage
- Click the chat bubble icon in the bottom-right corner of any page
- Type your question and press Enter or click Send
- The chatbot will respond with helpful information about restaurant operations

## Features
- Restaurant operations assistance
- Inventory management help
- Menu planning suggestions
- Cost analysis guidance
- Food safety information

## Notes
- The chatbot uses GPT-4 model
- API calls are made directly from the browser
- For production, consider using a backend proxy to protect your API key
- The chatbot is available on all dashboard pages

## Troubleshooting
- If you see "API error", check that your API key is correctly set
- Make sure you have credits in your OpenAI account
- Check browser console for detailed error messages

