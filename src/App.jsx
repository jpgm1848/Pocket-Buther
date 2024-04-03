import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Router, Routes, Route } from 'react-router-dom';
import MeatYourMatch from './components/MeatYourMatch';
import NewExperience from './components/NewExperience';
import Butchers from './components/Butchers';
import Community from './components/Community';
import StripeTest from './components/StripeTest';
// import findUserByToken from '../prisma/index.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SingleButcher from './components/SingleButcher.jsx';
import MyExperiences from './components/MyExperiences.jsx';

function App() {
  const [error, setError] = useState('');
  const location = useLocation();

  const login = async (credentials) => {
    let response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await response.json();
    if (response.ok) {
      const token = json.token;
      window.localStorage.setItem('token', token);
      console.log('Login succesful!');
    } else {
      setError('Error during login, please try again.');
      console.error('Error during login:', json);
    }
  };

  const register = async (credentials) => {
    let response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await response.json();
    if (response.ok) {
      console.log('Registration succesful:', json);
    } else {
      console.error('Error during registration:', json);
    }
  };

  // useEffect(() => {
  //   if (location.pathname === '/register') {
  //     setError('');
  //   }
  // }, [location.pathname]); // Watch for changes in the pathname

  return (
    <>
      <div>
        <h1 id='logo'>Pocket Butcher</h1>
        {/* {error && <p id='error-container'>{error}</p>} */}
      </div>
      <>
        <>
          <Routes>
            <Route path='/' element={<Login login={login} />}></Route>
            <Route
              path='/register'
              element={<Register register={register} />}
            ></Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/account' element={<Account />}></Route>
              <Route
                path='/meat-your-match'
                element={<MeatYourMatch />}
              ></Route>
              <Route path='/new-experience' element={<NewExperience />}></Route>
              <Route path='/my-experiences' element={<MyExperiences />}></Route>
              <Route path='/butchers' element={<Butchers />}></Route>
              <Route path='/butchers/:id' element={<SingleButcher />}></Route>
              <Route path='/community' element={<Community />}></Route>
              <Route path='/stripetest' element={<StripeTest />}></Route>
            </Route>
          </Routes>
        </>
      </>
    </>
  );
}

export default App;
