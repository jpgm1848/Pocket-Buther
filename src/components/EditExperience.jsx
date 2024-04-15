import React, { useState, useEffect } from 'react';
import RatingSystem from './RatingSystem';
import NavBar from './NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import logowhite from '../assets/logowhite.png';
import ribeyesteak from '../assets/ribeyesteak.png';
import filetmignon from '../assets/filetmignon.png';
import nystripsteak from '../assets/nystripsteak.png';
import porkloinchop from '../assets/porkloinchop.png';
import porkshoulder from '../assets/porkshoulder.png';
import beefbrisket from '../assets/beefbrisket.png';
import flanksteak from '../assets/flanksteak.png';
import chickenbreast from '../assets/chickenbreast.png';
import lambchop from '../assets/lambchop.png';
import groundbeef from '../assets/groundbeef.png';
import fetchAllButchers from '../utilities/fetchAllButchers';
import fetchUniqueExperience from '../utilities/fetchUniqueExperience';
import patchUserExperience from '../utilities/patchUserExperience';

const EditExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [experience, setExperience] = useState({
    butcher: '',
    date: '',
    meats: [],
    price: '',
    rating: null,
    review: '',
  });
  const [butcherOptions, setButcherOptions] = useState([]);

  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUniqueExperience(id).then(setExperience);
    fetchAllButchers().then(setButcherOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButcher = (event) => {
    const value = event.target.value;
    setExperience((prevExperience) => ({
      ...prevExperience,
      butcher: value,
    }));
  };

  const handleMeat = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setExperience((prevExperience) => ({
        ...prevExperience,
        meats: [...prevExperience.meats, value],
      }));
    } else {
      setExperience((prevExperience) => ({
        ...prevExperience,
        meats: prevExperience.meats.filter((meat) => meat !== value),
      }));
    }
  };

  const updateRating = (newRating) => {
    setExperience((prevExperience) => ({
      ...prevExperience,
      rating: newRating,
    }));
  };

  return (
    <>
      <NavBar />
      <div>
        <div id='experience-header'>
          <br />
          <h2>EDIT EXPERIENCE</h2>
        </div>
        <form id='edit-exp-body'>
          <label>
            <select value={experience.butcher} onChange={handleButcher}>
              <option value=''>Butcher Visited</option>
              {butcherOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label>
            <p>Date:</p>
            <input
              type='date'
              name='date'
              value={experience.date}
              onChange={(e) =>
                setExperience({ ...experience, date: e.target.value })
              }
            />
          </label>
          <br />
          <br />
          <label>
            <input
              className='checkbox'
              type='checkbox'
              value='ribeye steak'
              onChange={handleMeat}
              checked={experience.meats.includes('ribeye steak')}
            />{' '}
            <img className='icon' alt='ribeye steak' src={ribeyesteak} />
            <input
              className='checkbox'
              type='checkbox'
              value='filet mignon'
              onChange={handleMeat}
              checked={experience.meats.includes('filet mignon')}
            />{' '}
            <img className='icon' alt='filet mignon' src={filetmignon} />
            <input
              className='checkbox'
              type='checkbox'
              value='new york strip steak'
              onChange={handleMeat}
              checked={experience.meats.includes('new york strip steak')}
            />{' '}
            <img
              className='icon'
              alt='new york strip steak'
              src={nystripsteak}
            />
            <input
              className='checkbox'
              type='checkbox'
              value='pork loin chop'
              onChange={handleMeat}
              checked={experience.meats.includes('pork loin chop')}
            />{' '}
            <img className='icon' alt='pork loin chop' src={porkloinchop} />
            <input
              className='checkbox'
              type='checkbox'
              value='pork shoulder'
              onChange={handleMeat}
              checked={experience.meats.includes('pork shoulder')}
            />{' '}
            <img className='icon' alt='pork shoulder' src={porkshoulder} />
            <input
              className='checkbox'
              type='checkbox'
              value='beef brisket'
              onChange={handleMeat}
              checked={experience.meats.includes('beef brisket')}
            />{' '}
            <img className='icon' alt='beef brisket' src={beefbrisket} />
            <input
              className='checkbox'
              type='checkbox'
              value='flank steak'
              onChange={handleMeat}
              checked={experience.meats.includes('flank steak')}
            />{' '}
            <img className='icon' alt='flank steak' src={flanksteak} />
            <input
              className='checkbox'
              type='checkbox'
              value='chicken breast'
              onChange={handleMeat}
              checked={experience.meats.includes('chicken breast')}
            />{' '}
            <img className='icon' alt='chicken breast' src={chickenbreast} />
            <input
              className='checkbox'
              type='checkbox'
              value='lamb chop'
              onChange={handleMeat}
              checked={experience.meats.includes('lamb chop')}
            />{' '}
            <img className='icon' alt='lamb chop' src={lambchop} />
            <input
              className='checkbox'
              type='checkbox'
              value='ground beef'
              onChange={handleMeat}
              checked={experience.meats.includes('ground beef')}
            />{' '}
            <img className='icon' alt='ground beef' src={groundbeef} />
          </label>
          <br />
          <label>
            <p>Price/lb:</p>
            <input
              className='price-input'
              type='text'
              name='price'
              value={experience.price}
              onChange={(e) =>
                setExperience({ ...experience, price: e.target.value })
              }
            />
          </label>
          <br />
          <br />
          <label>
            <p>Review:</p>
            <RatingSystem
              rating={experience.rating}
              onRatingChange={updateRating}
            />

            <textarea
              className='notes-input'
              type='text'
              name='review'
              value={experience.review}
              onChange={(e) =>
                setExperience({ ...experience, review: e.target.value })
              }
            />
          </label>
          <br />
          <br />
          <button
            onClick={() => {
              setIsLoading(true);
              patchUserExperience(id, token, experience)
                .then(() => {
                  setIsLoading(false);
                  navigate('/my-experiences');
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.error('Error updating user experience:', error);
                });
            }}
            disabled={isLoading}
          >
            {' '}
            {isLoading ? 'Updating...' : 'UPDATE'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditExperience;
