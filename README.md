# TodoList React Firebase Application

## Gabriel Anderson - 2702256315

This README provides step-by-step instructions to set up and run this React application with Firebase integration.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (v6.0.0 or later) or [Yarn](https://yarnpkg.com/) (v1.22.0 or later)
- [Git](https://git-scm.com/) (optional, for cloning the repository)
- [Docker](https://www.docker.com/) (if running with Docker)

## Application Setup

### Running Locally

1. **Clone or Download the Project**
   ```bash
   git clone https://github.com/gamakagami/TodoList
   cd TodoList
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
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

3. **Push to Docker Hub (Optional)**
   - Log in to Docker Hub:
     ```bash
     docker login
     ```
   - Tag the image:
     ```bash
     docker tag my-todolist your-docker-username/my-todolist
     ```
   - Push the image:
     ```bash
     docker push your-docker-username/my-todolist
     ```
   - Share your Docker Hub link: `https://hub.docker.com/r/your-docker-username/my-todolist`

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
- [Docker Documentation](https://docs.docker.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

