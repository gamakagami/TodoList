import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className='h-[100vh]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
