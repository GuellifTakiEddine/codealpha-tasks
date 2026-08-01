# 📱 SocialBook

A full-stack social media web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can create accounts, share posts, like and comment on posts, follow other users, and manage their profiles through a modern, responsive interface.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login
- JWT authentication
- Protected routes
- Secure password hashing with bcrypt

### 👤 User Profiles
- View your own profile
- View other users' profiles
- Follow / Unfollow users
- Display followers and following counts
- Display user's posts

### 📝 Posts
- Create posts
- View all posts
- Delete your own posts
- Like / Unlike posts
- Real-time feed refresh

### 💬 Comments
- Add comments
- View comments
- Delete your own comments

### 🎨 UI
- Modern responsive design
- Sidebar navigation
- Right sidebar with profile statistics
- Toast notifications
- Responsive layout for desktop and mobile

---

# 🛠️ Tech Stack

## Frontend
- React
- React Router DOM
- Axios
- React Icons
- React Toastify
- CSS3

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

---

# 📂 Project Structure

```
SocialBook
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── assets
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/GuellifTakiEddine/codealpha-tasks.git
```

---

## Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |

---

## Users

| Method | Endpoint |
|---------|----------|
| GET | `/api/users` |
| GET | `/api/users/me` |
| GET | `/api/users/:id` |
| PUT | `/api/users/follow/:id` |
| PUT | `/api/users/unfollow/:id` |

---

## Posts

| Method | Endpoint |
|---------|----------|
| GET | `/api/posts` |
| POST | `/api/posts` |
| DELETE | `/api/posts/:id` |
| PUT | `/api/posts/like/:id` |

---

## Comments

| Method | Endpoint |
|---------|----------|
| GET | `/api/comments/:postId` |
| POST | `/api/comments` |
| DELETE | `/api/comments/:id` |

---

# 📸 Screenshots

You can add screenshots here after uploading them to GitHub.

Example:

```
screenshots/
├── login.png
├── home.png
├── profile.png
└── comments.png
```

---

# 🔮 Future Improvements

- Upload profile pictures
- Upload post images
- Search users
- Notifications
- Real-time chat
- Dark mode
- Infinite scrolling
- Friend suggestions
- User settings
- Email verification

---

# 👨‍💻 Author

**Guellif Taki Eddine**

- GitHub: https://github.com/GuellifTakiEddine

---

# 📄 License

This project was developed for educational purposes as part of the **CodeAlpha Full Stack Development Internship**.
