📝 Todo List
A simple and efficient Todo List application built with Firebase.

🚀 Features
✅ Add, edit, and delete tasks
✅ Mark tasks as completed
✅ Persistent storage using Firebase Firestore
✅ User authentication (if applicable)

🛠️ Tech Stack
Frontend: React (or your framework)
Database: Firebase Firestore
Authentication: Firebase Auth (if used)
📦 Prerequisites
Before running the project, make sure you have:

Node.js (Download: https://nodejs.org/)
npm (comes with Node.js) or yarn
A Firebase account and project
⚡ Setup & Installation
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/gamakagami/TodoList.git  
cd TodoList  
2️⃣ Install Dependencies
sh
Copy
Edit
npm install  # or yarn install  
3️⃣ Set Up Firebase
Go to the Firebase Console and create a new project.
Enable Firestore Database:
Navigate to Firestore Database > Click Create Database
Choose Start in Test Mode (or configure rules later)
(Optional) Enable Firebase Authentication:
Go to Authentication > Sign-in method > Enable desired providers
Get your Firebase Config:
Go to Project settings > General > Your apps
Copy the Firebase config object.
4️⃣ Configure Environment Variables
In the project root, create a .env file
Add the following Firebase configuration (replace with your actual Firebase credentials):
env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Save the file
5️⃣ Run the Application
sh
Copy
Edit
npm start  # or yarn start  
Your app should now be running at http://localhost:3000/ 🚀

🐛 Troubleshooting
If Firebase throws errors, check if your .env file is properly set.
Make sure Firestore read/write rules allow access:
json
Copy
Edit
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if true; // Change based on your security needs
    }
  }
}
Run npm install again if dependencies are missing
