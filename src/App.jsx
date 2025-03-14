import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className='h-[100vh]'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
