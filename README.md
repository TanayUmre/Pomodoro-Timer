🍅 Pomodoro Timer

A clean and minimalist Pomodoro Timer desktop app built with React and Electron.

The app provides a focused 30-minute work session with a visual circular progress indicator, simple timer controls, dark/light mode, and a celebratory confetti animation when the session is completed.

✨ Features

⏱️ 30-minute focus timer

▶️ Start / Pause functionality

🔄 Reset the current session

🎉 Confetti celebration when the timer reaches zero

🌓 Dark and Light mode

🔵 Circular SVG progress indicator

💻 Desktop application powered by Electron

📐 Responsive layout that stays centered within the application window

🧹 Minimal and distraction-free interface

🛠️ Tech Stack

React — UI and application logic

Electron — Desktop application wrapper

JavaScript — Application logic

CSS — Styling and themes

SVG — Circular timer progress indicator

canvas-confetti — Completion animation

📸 Preview

Add a screenshot or GIF of your application here.

┌────────────────────────────────────┐
│                                    │
│          READY TO FOCUS       ☀️  │
│                                    │
│              ◯                     │
│            29:42                   │
│            MINUTES                 │
│                                    │
│       [    Start    ] [ Reset ]    │
│                                    │
│        ● 30 minute focus session   │
│                                    │
└────────────────────────────────────┘

🚀 Getting Started
Prerequisites

Make sure you have the following installed:

Node.js

npm

Git

Clone the repository
git clone https://github.com/your-username/pomodoro-timer.git


Navigate into the project:

cd pomodoro-timer

Install dependencies
npm install

Start the React development server
npm run dev


Then start Electron in another terminal if your project is configured that way:

npm run electron


The Electron window currently loads the React development server from http://localhost:5173.

📁 Project Structure
pomodoro-timer/
│
├── electron/
│   └── main.js
│
├── src/
│   ├── Pomodoro.jsx
│   ├── main.css
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md


The exact structure may vary depending on your Vite/React setup.

⚙️ How It Works

The timer starts with:

const TOTAL_TIME = 30 * 60;


which represents a 30-minute session in seconds.

React's useState manages the timer state:

const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
const [isRunning, setIsRunning] = useState(false);


When the timer is running, useEffect creates a one-second interval and decreases the remaining time.

The circular progress indicator is calculated using the circumference of the SVG circle:

const circumference = 2 * Math.PI * 120;
const progress = timeLeft / TOTAL_TIME;
const dashOffset = circumference * (1 - progress);


When the timer reaches zero, the application triggers a confetti animation:

confetti({
  particleCount: 150,
  spread: 100,
  origin: { y: 0.6 },
});

🎨 Themes

The application supports both dark and light themes.

The theme is controlled using React state:

const [isDark, setIsDark] = useState(true);


The container receives either:

pomodoro-container dark


or:

pomodoro-container light


CSS then applies the appropriate colors and styling.

🖥️ Electron

Electron provides the desktop environment for the React application.

The main Electron process creates the application window and loads the React development server:

mainWindow = new BrowserWindow({
  width: 500,
  height: 650,
  minWidth: 400,
  minHeight: 550,

  alwaysOnTop: true,
  frame: true,
  autoHideMenuBar: true,

  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
  },
});


The alwaysOnTop option allows the Pomodoro timer to remain visible while working in other applications.

🔮 Future Improvements

Some ideas for future versions:

🍅 Custom timer durations

☕ Short and long break sessions

🔔 Desktop notifications

🔊 Optional sound when a session ends

📊 Daily/weekly productivity statistics

💾 Persistent timer settings

⌨️ Keyboard shortcuts

📌 Tray/minimize-to-tray functionality

🎯 Multiple Pomodoro sessions

⚙️ Settings panel

📦 Production builds for Windows, macOS, and Linux

🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you'd like to contribute:

Fork the repository.

Create a new branch.

git checkout -b feature/your-feature


Make your changes.

Commit your changes.

git commit -m "Add your feature"


Push the branch.

git push origin feature/your-feature


Open a Pull Request.

📄 License

This project is open source and available under the MIT License.

👨‍💻 Author

Your Name

If you found this project useful, consider giving the repository a ⭐ on GitHub.