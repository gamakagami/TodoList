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

1. **Build the Docker Image**
   ```bash
   docker build -t my-todolist .
   ```

2. **Run the Application in a Docker Container**
   ```bash
   docker run -p 5173:5173 my-todolist
   ```
   - The application will be available at `http://localhost:5173`

3. **Test the Docker Setup**
   - Stop any running container (if necessary):
     ```bash
     docker stop my-todolist
     docker rm my-todolist
     ```
   - Remove the Docker image (optional for testing fresh builds):
     ```bash
     docker rmi my-todolist
     ```
   - Re-clone and rebuild to ensure a fresh test:
     ```bash
     git clone https://github.com/gamakagami/TodoList
     cd TodoList
     docker build -t my-todolist .
     docker run -p 5173:5173 my-todolist
     ```
   - Open `http://localhost:5173` in your browser to verify it runs correctly.

### Uploading to Docker Hub

1. **Log in to Docker Hub**
   ```bash
   docker login
   ```
   - Enter your **Docker Hub** credentials.

2. **Tag the Docker Image**
   ```bash
   docker tag my-todolist gamakagami/my-todolist
   ```

3. **Push the Image to Docker Hub**
   ```bash
   docker push gamakagami/my-todolist
   ```

4. **Verify the Upload**
   - Visit **[Docker Hub Repository](https://hub.docker.com/repository/docker/gamakagami/my-todolist)** to check if the image appears.

5. **Share the Docker Image**
   - Others can pull and run it using:
     ```bash
     docker pull gamakagami/my-todolist
     docker run -p 5173:5173 gamakagami/my-todolist
     ```

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
- [Docker Documentation](https://docs.docker.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

