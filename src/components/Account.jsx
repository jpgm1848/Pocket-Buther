import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import exppic from '../assets/exppic.jpg';
import meatmatchpic from '../assets/meatmatchpic.jpg';
import meatshop from '../assets/meatshop.jpg';
import meatsbw from '../assets/meatsbw.jpg';
import verifyToken from '../utilities/verifyToken';
import fetchUserById from '../utilities/fetchUserById';
import fetchExperiences from '../utilities/fetchExperiences';

const Account = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    verifyToken(token)
      .then(fetchUserById)
      .then(setCurrentUser)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchExperiences()
      .then(setExperiences)
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavBar />
      <div id='account-header'>
        {/* <img id='logo-account' src={logowhite}/> */}
        <h2>MY ACCOUNT</h2>
      </div>
      <div id='user-welcome'>
        {currentUser ? (
          <h3 id='welcome-message'>Welcome {currentUser.name}!</h3>
        ) : null}
      </div>
      <div id='account-body'>
        <h3 className='account-cards'>
          <p className='acct-card-headers'>MY EXPERIENCES</p>
          <div className='border'>
            <img id='acct-my-exp' src={meatsbw} />
          </div>
          <button
            className='acct-card-button'
            onClick={() => navigate('/my-experiences')}
          >
            Browse All
          </button>
        </h3>
        <h3 className='account-cards'>
          <p className='acct-card-headers'>MEAT YOUR MATCH</p>
          <div className='border'>
            <img id='acct-meet' src={meatsbw} />
          </div>
          <button
            className='acct-card-button'
            onClick={() => navigate('/meat-your-match')}
          >
            Search
          </button>
        </h3>
        <h3 className='account-card-right'>
          <p className='acct-card-headers'>CREATE EXPERIENCE</p>
          <div className='border'>
            <img id='acct-exp-pic' src={meatsbw} />
          </div>
          <button
            className='acct-card-button'
            onClick={() => navigate('/new-experience')}
          >
            New
          </button>
        </h3>
      </div>
    </>
  );
};

export default Account;
