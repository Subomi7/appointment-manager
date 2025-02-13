import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import AppointmentDetails from './components/AppointmentDetails';
import NavBar from './layout/NavBar';
import { useAuth } from './context/AuthContext';
import Login from './auth/Login';
import Signup from './auth/SignUp';
import { Container } from 'react-bootstrap';
import Home from './page/Home';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.isAdmin) {
    return <Navigate to='/Login' />;
  }
  return children;
};

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className='mt-0 appointment-list p-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/appointment/:id' element={<AppointmentDetails />} />
            <Route
              path='/create'
              element={
                <ProtectedRoute>
                  <AppointmentForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <ProtectedRoute>
                  <AppointmentForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
