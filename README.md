# 🎯 GridGame

A fast-paced reflex game built with React and Bootstrap. Click on randomly highlighted boxes to score points before time runs out!

## 🚀 Features

- ⏱ 25-second timed game
- 🎲 Randomly highlighted grid boxes
- ✅ Score tracking and display
- 💾 Score submission to a Supabase-powered leaderboard
- 🏆 Leaderboard with pagination and animations
- 🎮 Replay and compete again options
- 🔒 Environment variables for secure Supabase config

## 📸 Demo


## 🛠️ Technologies

- React
- React Router
- Bootstrap 5
- Supabase (Database)
- Animate.css (for subtle animations)


## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/Promicron/gridGame.git
cd gridGame
```

### 2. Install dependencies
```
npm install
```

### 3. Create a Supabase project and set up environment variables
- Create a new Supabase project and set up a database and authentication.
- Create a new table named `leaderboard` with the following columns:
- `id` (primary key, auto-incrementing integer)
- `name` (string)
- `score` (integer)
- `created_at` (timestamp)

### 4. Set up environmental variables

- Create a `.env` file in the project root with the following format:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
⚠️ Do not commit your keys to version control. Use .gitignore to exclude .env.
Replace the placeholders with your actual Supabase project details.


### 5. Run the app

- Run `npm run build` to create a production build with environment variables.
- Run `npm run dev` to start the development server.
- Open your browser and navigate to `http://localhost:5173` to play the game.






