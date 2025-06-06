import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import HootListPage from '../HootListPage/HootListPage';
import HootDetailsPage from '../HootDetailsPage/HootDetailsPage';
import HootFormPage from '../HootFormPage/HootFormPage';
import * as hootService from '../../services/hootService';
import './App.css';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  const handleAddHoot = async (hootFormData) => {
  const newHoot = await hootService.create(hootFormData);
  setHoots([newHoot, ...hoots]);
  navigate('/hoots');
  };
  const handleDeleteHoot = async (hootId) => {
  console.log('hootId', hootId);
  };


  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
  
      setHoots(hootsData);
      
    };

    
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots}/>} />
            <Route path="/hoots/:hootId" element={<HootDetailsPage hoot={hoots} />} />
            <Route path="/hoots/new" element={<HootFormPage handleAddHoot={handleAddHoot} />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}