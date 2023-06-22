import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin, getUserInfo } from '../api/auth'; // Import the getUserInfo function
import { AuthContext } from "../context/AuthContextComponent";

export default function Signin() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await signin(text, password);

      if (response.error) {
        setErrorMessage('User does not exist.');
      } else {
        const { token } = response;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);

        const userInfo = await getUserInfo(); // Retrieve user info after successful signin

        if (userInfo.error) {
          setErrorMessage('Failed to get user information.');
        } else {
          setUser(userInfo); // Update the user context with the retrieved user info
        }

        navigate('/home');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setErrorMessage('Authentication failed. Please try again.');
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
  );
}
