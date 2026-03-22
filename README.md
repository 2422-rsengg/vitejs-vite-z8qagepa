Diva Life-Load Assistant (AI Agent Orchestrator)

 🎯 Solution Summary
An AI-powered orchestrator designed to reduce decision fatigue for professional women. It synchronizes a user's professional calendar with their real-time "Bandwidth" (Energy level) to automate meal planning and daily directives.

 🧠 Implementation & Logic
The agent uses conditional reasoning to map calendar blocks and energy states:
- Energy-Aware Fetching: Adjusts Spoonacular API parameters (like `maxReadyTime`) based on user vibe.
- Agent Memory Fallback: If API limits are reached, the agent triggers a local "Memory" system to ensure a 100% working prototype at all times.

 🛠 Tech Stack
- Frontend: React.js + TypeScript (Vite)
- Styling: Tailwind CSS & Lucide-React Icons
- API: Spoonacular Recipe Intelligence

 🚀 How to Run the Prototype
1. Extract: Unzip the codebase.
2. Install: Run `npm install` in the terminal.
3. API Key: Ensure the `.env` file contains your `VITE_SPOON_API_KEY` on a single line.
4. Launch: Run `npm run dev` and follow the local URL.
