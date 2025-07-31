# 🧘‍♀️ Zenflow – Wellness Session Platform

A full-stack wellness platform where users can register, log in, create draft/published wellness sessions, and enjoy an auto-save experience — built for the Arvyax Full Stack Internship assignment.

---

## 🚀 Live Demo

- 🌐 **Frontend:** [wellness-taupe-delta.vercel.app](https://wellness-taupe-delta.vercel.app/)
- 🔗 **Backend:** [wellness-server-weld.vercel.app](https://wellness-server-weld.vercel.app/)

---

## 📁 Folder Structure

WELLNESS-PLATFORM/
├── WELLNESS-CLIENT/ --> React frontend
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── vite.config.js
│ └── ...
│
├── WELLNESS-SERVER/ --> Express backend
│ ├── index.js
│ ├── package.json
│ └── vercel.json
│
└── README.md --> (You're reading this)



## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Auth:** JWT (`jsonwebtoken` + `bcrypt`)  
- **Deployment:** Vercel (frontend), Render (backend)

---

## ✅ Features

### 🔐 Authentication

- `POST /register` – Register user with hashed password
- `POST /login` – Authenticate and return JWT
- JWT stored securely in `localStorage`
- Protected routes using JWT middleware

---

### 📝 Session Management

| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| GET    | `/sessions`                 | Public wellness sessions          |
| GET    | `/my-sessions`              | User's sessions (draft + published) |
| GET    | `/my-sessions/:id`          | View single session               |
| POST   | `/my-sessions/save-draft`   | Save or update session draft      |
| POST   | `/my-sessions/publish`      | Publish a session                 |

---

## 🌐 Frontend Pages

- **Login / Register** – Token-based login/registration forms
- **Dashboard** – View public published sessions
- **My Sessions** – View and manage your draft and published sessions
- **Session Editor** – Create/edit sessions with:
  - Title
  - Tags (comma-separated)
  - JSON file URL
  - Save as Draft / Publish buttons
  - Auto-save after 5s of inactivity (bonus)

---

## 💾 Database Schema

### User

```json
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  created_at: Date
}
Session
json
{
  _id: ObjectId,
  user_id: ObjectId,
  title: String,
  tags: [String],
  json_file_url: String,
  status: "draft" | "published",
  created_at: Date,
  updated_at: Date
}
⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/LamiyaRK/Wellness.git
cd Wellness
2. Backend Setup
cd WELLNESS-SERVER
npm install
cp .env.example .env
# Fill in your environment variables in .env
npm run dev
3. Frontend Setup
cd ../WELLNESS-CLIENT
npm install
npm run dev
🔑 Environment Variables
.env.example for Backend
env
db_name=your_mongodb_database_name
db_pass=your_mongodb_database_password
JWT_SECRET=your_jwt_secret
✨ Bonus Features
✅ Auto-save with debounce after 5s inactivity

✅ Auto-save feedback toast

✅ Fully responsive UI

✅ Logout functionality

✅ Clean folder structure and reusable components

👩‍💻 Author
Name: Lamiya Rahman Khan
Email: lamiyarahmankhan01@gmail.com
Internship Role: Full Stack Developer Intern