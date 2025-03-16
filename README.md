# React Firebase Application

This README provides step-by-step instructions to set up and run this React application with Firebase integration.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (v6.0.0 or later) or [Yarn](https://yarnpkg.com/) (v1.22.0 or later)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

## Firebase Setup

1. **Create a Firebase Project**
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Give your project a name and follow the prompts

2. **Register Your App with Firebase**
   - From your Firebase project dashboard, click the web icon (</>) to add a web app
   - Give your app a nickname and register it
   - Copy the Firebase configuration object (you'll need this later)

3. **Enable Required Firebase Services**
   - In the Firebase Console, navigate to the desired services:
     - **Authentication**: "Build > Authentication" and set up sign-in methods
     - **Firestore Database**: "Build > Firestore Database" and create database
     - **Storage** (if needed): "Build > Storage" and set up storage rules
     - **Hosting** (if deploying to Firebase): "Build > Hosting"

## Application Setup

1. **Clone or Download the Project**
   ```bash
   git clone [https://github.com/gamakagami/TodoList]
   cd [TodoList]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```
   - Alternatively, update the Firebase config in `src/firebase/config.js` (if present)

## Running the Application

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - The application should now be running with Firebase connectivity

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
