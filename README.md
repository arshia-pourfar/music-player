# 🎵 Music Player

A modern, responsive **music player** built with **React**, connected to a backend API for fetching music data.  
Designed to provide a seamless and enjoyable listening experience with a clean, user-friendly interface, including user authentication and personalized favorites.

---

## 🚀 Live Demo

🌐 [View Live Site](https://music-player-eight-red.vercel.app/)

---

## 🧩 Overview

**Music Player** is a full-featured front-end project developed using React. The app interacts with a backend API to retrieve music tracks and provides features for both casual users and logged-in users.  

Admins / Users can:

- Browse all music tracks
- Play, pause, skip, loop, and shuffle tracks
- Control volume and mute  

Logged-in users can:

- Login and Logout securely
- Access **Favorites** page showing their liked tracks

**Note:** This project does **not** include an admin panel; it only consumes data from the backend.

---

## 🛠️ Technologies Used

**Frontend:**
- **React** – Functional components, JSX, state & props management  
- **Tailwind CSS** – Utility-first responsive styling  
- **JavaScript (ES6+)** – Main programming language  
- **React Icons / FontAwesome** – Scalable vector icons  
- **Axios / Fetch API** – For fetching data from backend  
- **React Context API** – Manage user authentication & global state  
- **Custom Hooks** – For data fetching & responsive behavior  

**Backend:**
- **Node.js** – JavaScript runtime for backend  
- **Express.js** – Web framework for building RESTful APIs  
- **PostgreSQL** – Relational database for storing users, tracks, and favorites   
- **dotenv** – Manage environment variables  
- **bcrypt** – Password hashing for secure authentication  
- **jsonwebtoken (JWT)** – User authentication & session management  

---

## ✨ Key Features

- ✅ Fully responsive (mobile, tablet, desktop)  
- 🎵 Seamless music playback with play, pause, skip  
- 🔁 Loop and shuffle options for dynamic listening  
- 🎚️ Volume control with mute option  
- 🔑 Login and Logout functionality  
- ⭐ Favorites page for logged-in users  
- 📡 Fetches music data from backend API  
- ⚙️ Clean, modular, component-based structure  
- 🛠️ Ready for further enhancements like Playlist, History, or personalizations  

---

## 📥 Installation & Local Setup

```bash
git clone https://github.com/arshia-pourfar/music-player.git
cd music-player
npm install
npm start

Backend (optional):
cd server
npm install
npm start

Then open your browser and go to:
http://localhost:3000
```
---

## 📂 Project Structure

```plaintext
Music-Player/
├── package.json                 # Frontend dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── tailwind.config.js            # Tailwind CSS configuration
├── .env                          # Frontend environment variables
├── README.md                     # Project documentation
└── src/                          # Frontend source code
|   ├── index.js                  # React app entry point
|   ├── index.css                 # Global styles
|   ├── App.js                    # Main app component
|   ├── components/               # Reusable UI components
|   │   ├── FavoriteIcon.js       # Favorite (like) button
|   │   ├── Header.js             # Main header bar
|   │   ├── MenuIcon.js           # Menu icon component
|   │   ├── MusicList.js          # List of songs component
|   │   ├── MusicPlayer.js        # Music player controls & playback
|   │   ├── Navbar.js             # Navigation bar
|   │   └── home/                 # Home page sections
|   │       ├── HeaderPostCarousel.js # Carousel for featured tracks
|   │       ├── RecentFavourite.js    # Recently favorited tracks
|   │       ├── TopArtist.js          # Top artist section
|   │       └── TrendingList.js       # Trending songs section
|   ├── data/
|   │   └── tracks.js             # Static track data (fallback/demo)
|   ├── font/
|   │   ├── Rubik-Italic-VariableFont_wght.ttf
|   │   └── Rubik-VariableFont_wght.ttf
|   ├── hooks/
|   │   ├── AuthContext.js        # User authentication context
|   │   ├── useFetchData.js       # Custom hook for fetching API data
|   │   └── useWidthSize.js       # Hook for responsive behavior
|   └── pages/                    # Application pages (React Router)
|       ├── AllMusic.js           # All songs page
|       ├── Download.js           # Download page
|       ├── Favourite.js          # User's favorite tracks
|       ├── Home.js               # Homepage
|       ├── LogIn.js              # Login page
|       ├── PlayList.js           # Playlist page
|       └── Setting.js            # Settings page
|
└── server/                       # Backend source code (Node.js + Express)
    ├── controllers/              # API request handlers
    │   ├── authController.js     # Login, logout, and user auth
    │   ├── musicController.js    # Fetch and manage music data
    │   └── favouriteController.js# Manage user's favorite tracks
    ├── models/                   # Database schemas/models (MongoDB/Prisma/etc.)
    │   ├── User.js               # User model
    │   ├── Track.js              # Track (song) model
    │   └── Favourite.js          # Favorite track relationship model
    ├── routes/                   # API routes
    │   ├── authRoutes.js         # Routes for authentication
    │   ├── musicRoutes.js        # Routes for music data
    │   └── favouriteRoutes.js    # Routes for favorites
    ├── utils/                    # Helper utilities
    │   └── db.js                 # Database connection setup
    ├── .env                      # Backend environment variables
    ├── server.js                 # Backend entry point (Express app)
    └── package.json              # Backend dependencies and scripts
```
---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create your feature branch: git checkout -b feature/YourFeature
3. Commit your changes: git commit -m "Add new feature"
4. Push to your branch: git push origin feature/YourFeature
5. Open a pull request

---

## 👤 Author

**Arshia Pourfar**  
🔗 [GitHub Profile](https://github.com/arshia-pourfar)  
💼 [LinkedIn](https://www.linkedin.com/in/arshia-pourfar)  
📧 [arshiapourfar@gmail.com](mailto:arshiapourfar@gmail.com)   
