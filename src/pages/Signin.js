import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from '../api/auth'
import { AuthContext } from "../context/AuthContextComponent";

export default function Signin() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error message
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Make a request to the server to authenticate the user
      const response = await signin(text, password);

      if (response.error) {
        // Authentication failed - user does not exist
        setErrorMessage('User does not exist.');
      } else {
        // Authentication succeeded
        const { token } = response;
        // Store the token in local storage
        localStorage.setItem('token', token);
        // Set the authentication state to true
        setIsLoggedIn(true);
        // Redirect the user to the authenticated route
        navigate('/api/saleposts');
      }
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication failed:', error);
      setErrorMessage('Authentication failed. Please try again.'); // Set a generic error message
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      {errorMessage && <p>{errorMessage}</p>} {/* Render the error message if it exists */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button> {/* Specify the type as "submit" */}
      </form>
      <span>
        {'Not a user yet? '}
        <Link to="/auth/signup">Sign Up</Link>
      </span>
    </div>
  )
}
