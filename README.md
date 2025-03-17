# TodoList React Firebase Application

## Gabriel Anderson - 2702256315

This README provides step-by-step instructions to set up and run this React application with Firebase integration.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (v6.0.0 or later) or [Yarn](https://yarnpkg.com/) (v1.22.0 or later)
- [Git](https://git-scm.com/) (for cloning the repository)
- [Docker](https://www.docker.com/) (if running with Docker)

## Application Setup

### Clone the Repository
Before running the application, either locally or with Docker, clone the repository:
```bash
git clone https://github.com/gamakagami/TodoList
cd TodoList
```

### Running Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - The application should now be running with Firebase connectivity

### Running with Docker

1. **Pull the Docker Image**
     ```bash
     docker pull gamakagami/my-todolist
     ```

2. **Run the Container**
     ```bash
     docker run -p 5173:5173 gamakagami/my-todolist
     ```

3. **Access the Application**
     ```bash
     http://localhost:5173/
     ```

4. **Stop the Docker Container**
   - docker ps to show the running containers and stop it with the following
     ```bash
     docker ps
     docker stop <CONTAINER_ID>
     docker rm <CONTAINER_ID>
     ```
## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
- [Docker Documentation](https://docs.docker.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

