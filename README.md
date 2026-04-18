# 📝 Blog App

A full-stack Blog Application built with **React**, **Appwrite**, and **Redux Toolkit**.
Users can create, edit, delete, and read blog posts with authentication support.

---

## 🚀 Features

*  User Authentication (Login / Signup)
*  Create, Edit, Delete Posts
*  Upload Featured Images
*  View All Posts
*  Rich Text Editor (RTE)
*  Real-time Database using Appwrite
*  Loading Spinners for better UX
*  Slug-based Routing for SEO-friendly URLs

---

## 🛠️ Tech Stack

**Frontend:**

* React JS
* React Router DOM
* Redux Toolkit
* Tailwind CSS

**Backend:**

* Appwrite (Database, Auth, Storage)

---

## 📂 Folder Structure

```
src/
│
├── components/
│   ├── PostForm.jsx
│   ├── PostCard.jsx
│   ├── RTE.jsx
│   └── UI Components
│
├── pages/
│   ├── Home.jsx
│   ├── Post.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   └── Spinner.jsx
│
├── appwrite/
│   ├── auth.js
│   └── database.js
│
├── store/
│   └── redux store files
│
└── App.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in root and add:

```
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

---

### 4️⃣ Run the App

```bash
npm run dev
```

---

## Appwrite Configuration

* Create a Project in Appwrite
* Setup:

  * Database & Collection
  * Storage Bucket
  * Authentication (Email/Password)

---

## 🧠 What I Learned

* Managing global state using Redux Toolkit
* Handling async operations with API calls
* File upload & storage using Appwrite
* Creating reusable components
* Implementing loaders for better UX

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📧 Contact

* LinkedIn: *(https://www.linkedin.com/)*
* GitHub: *(https://github.com/Ahsan-Mudassar)*
* live demo: *(https://blog-app-tau-pink.vercel.app/)*
---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
