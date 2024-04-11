import NavBar from "./NavBar";
import { useState, useParams, useNavigate, useEffect } from "react";
import { Link } from "react-router-dom";

  const Butchers = ()=> {
    const [butchersData, setButchersData] = useState([]);

    useEffect(() => {
      const fetchAllButchers = async () => {
        try {
          const url = "http://localhost:3001/api/butchers/";
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch (url, options);
          const responseData = await response.json();
          setButchersData(responseData);
        } catch (error) {
          console.error("Error fetching butchers:", error)
        }
      };
      fetchAllButchers();
    }, []);
 

  return (
    <>
    <NavBar/>
    <div id='app-header'>
    <img id='logo-account' src='https://mail.google.com/mail/u/0?ui=2&ik=ccaf984398&attid=0.1&permmsgid=msg-a:r3048535673371188519&th=18ecdcf578acb712&view=att&disp=safe&realattid=f_luvelq7r0'/>
      <br/>
    <h2>PARTICIPATING BUTCHERS</h2>
    </div>
    <div id='butcher-container'>
      {butchersData.map((butcher) => (
        <div id='butcher-body' key={butcher.id}>
          <h2 id='butcher-name'>{butcher.name}</h2>
          <h3>{butcher.street}</h3>
          <h3>{butcher.city}, {butcher.state}  {butcher.zipcode}</h3>
          <h3>Contact: {butcher.phonenumber}</h3>
          <br />
          <Link to={`/butchers/${butcher.id}`}>
          <button>BUTCHER PROFILE</button>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};

export default Butchers;