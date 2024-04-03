import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = ({ register }) => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const credentials = {
      name,
      email,
      password,
    };

    try {
      await register(credentials);
      navigate('/stripepayment');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <>
      <div id='register-container'>
        <form onSubmit={submit}>
          <input
            placeholder='First Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          {/* <input
            placeholder='Last Name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <br /> */}
          {/* <input
            placeholder='Zip code'
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
          <br /> */}
          <input
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <input
            placeholder='Password'
            value={password}
            type='password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button type='submit'>REGISTER</button>
          <br />
        </form>
        <Link className='link' to='/'>
          Already a Member? Login
        </Link>
      </div>
    </>
  );
};

export default Register;
