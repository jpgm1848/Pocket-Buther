import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MyExperiences = ({ auth }) => {
  const [experiences, setExperiences] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/experiences');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        console.error('Failed to fetch experiences:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const deleteExperience = async (id, token) => {
    try{
      const response = await fetch(`http://localhost:3001/api/experiences/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      if (response.ok) {
        fetchExperiences();
    } else {
      console.error ('Something went wrong');
    }
  } catch (error) {
    console.error('Error deleting experience:');
  }
};

  return (
    <>
      <NavBar />
      <h2>
        MY EXPERIENCES
      </h2>
      <div id="community-body">
        <div id='community-container'>
          {experiences.map((experience) => (
            <div className='experience-card' key={experience.id}>
              <h4>{experience.butcher}</h4>
              <p>Purchased: {experience.meats.join(', ')}</p>
              <p>Price/lb: ${experience.price}</p>
              <p>Notes:</p>
              <p>{experience.review}</p>
              <button>EDIT</button>
              <Link to={'/my-experiences'}>
              <button onClick={()=> deleteExperience(experience.id)}>DELETE</button>
              </Link>
            </div>
          ))}
      </div>
      <div>
      <button onClick={() => navigate('/new-experience')}>CREATE EXPERIENCE</button>
      </div>
      </div>
      </>
  );
};

export default MyExperiences;